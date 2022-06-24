import { render, screen } from '@testing-library/react'

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { mocked } from 'jest-mock'
import { getPrismicClient } from '../../services/prismic'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')
const post = {
  slug: 'my-new-post',
  title: 'new post',
  content: 'post excepkkkk',
  updatedAt: 'Abril 10'
}

describe('Post preview Page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    render(<Post post={post} />)
    expect(screen.getByText('new post')).toBeInTheDocument()
    expect(screen.getByText('post excepkkkk')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const routerMocked = mocked(useRouter)
    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ] as any)
    const mockedPush = jest.fn()
    routerMocked.mockReturnValueOnce({
      push: mockedPush
    } as any)
    render(<Post post={post} />)

    expect(mockedPush).toHaveBeenCalledWith('/post/my-new-post')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'title' }],
          content: [{ type: 'paragraph', text: 'content' }]
        },
        last_publication_date: '04-01-2001'
      })
    } as any)
    const response = await getStaticProps({
      req: {
        cookies: {}
      },
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'title',
            content: '<p>content</p>',
            updatedAt: '01 de abril de 2001'
          }
        }
      })
    )
  })
})
