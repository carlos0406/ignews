import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'
import { SignInButton } from '.'
jest.mock('next-auth/client')

describe('SignInButton component ', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(<SignInButton />)
    expect(screen.getByText('Sign in With Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          email: 'user@example.com',
          name: 'Robson'
        },
        expires: 'expires'
      },
      false
    ])
    render(<SignInButton />)
    expect(screen.getByText('Robson')).toBeInTheDocument()
  })
})
