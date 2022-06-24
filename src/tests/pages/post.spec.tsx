import { render, screen } from '@testing-library/react'

import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { mocked } from 'jest-mock'
import { getPrismicClient } from '../../services/prismic'
import { getSession } from 'next-auth/client'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
const post = {
  slug: 'my-new-post',
  title: 'new post',
  content: 'post excepkkkk',
  updatedAt: 'Abril 10'
}

describe('Post Page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)
    expect(screen.getByText('new post')).toBeInTheDocument()
    expect(screen.getByText('post excepkkkk')).toBeInTheDocument()
  })

  it('redirects user if no subscriptions is found', async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null
    })
    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: { slug: 'my-new-post' }
    } as any)
    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({ destination: '/' })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    })

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'title' }],
          content: [{ type: 'paragraph', text: 'content' }]
        },
        last_publication_date: '04-01-2001'
      })
    } as any)
    const response = await getServerSideProps({
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
