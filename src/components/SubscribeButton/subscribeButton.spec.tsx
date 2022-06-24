import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton component ', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocker = mocked(useSession)
    useSessionMocker.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })
  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocker = mocked(useSession)
    useSessionMocker.mockReturnValueOnce([null, false])

    const singInMocked = mocked(signIn)
    render(<SubscribeButton />)
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(singInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user alerdy has a subscription', () => {
    const routerMocked = mocked(useRouter)
    const useSessionMocker = mocked(useSession)
    const pushMock = jest.fn()

    routerMocked.mockReturnValueOnce({
      push: pushMock
    } as any)
    useSessionMocker.mockReturnValueOnce([
      {
        user: {
          email: 'user@example.com',
          name: 'Robson'
        },
        activeSubscription: 'teste',
        expires: 'expires'
      },
      false
    ])
    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)
    expect(pushMock).toHaveBeenCalled()
    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})
