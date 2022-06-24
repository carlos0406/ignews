import { render, screen } from '@testing-library/react'

import Post, { getStaticProps } from '../../pages/posts'
import { mocked } from 'jest-mock'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')
const posts = [
  {
    slug: 'my-new-post',
    title: 'new post',
    excerpt: 'post except',
    updatedAt: 'Abril 10'
  },
  {
    slug: 'my-new-pos2',
    title: 'new post2',
    excerpt: 'post except',
    updatedAt: 'Abril 10'
  }
]
describe('Posts Page', () => {
  it('renders correctly', () => {
    render(<Post posts={posts} />)
    expect(screen.getByText('new post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocker = mocked(getPrismicClient)
    getPrismicClientMocker.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'title' }],
              content: [{ type: 'paragraph', text: 'content' }]
            },
            last_publication_date: '04-01-2001'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'title',
              excerpt: 'content',
              updatedAt: '01 de abril de 2001'
            }
          ]
        }
      })
    )
  })
})
