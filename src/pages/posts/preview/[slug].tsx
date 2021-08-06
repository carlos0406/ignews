import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { getPrismicClient } from '../../../services/prismic'
import { RichText } from 'prismic-dom'
import Head from 'next/head'
import styles from '../post.module.scss'
import { redirect } from 'next/dist/next-server/server/api-utils'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}
export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.activeSubscription) {
      router.push('/')
    }
  }, [session])
  return (
    <div>
      <>
        <Head>
          <title>Ignews | {post.title}</title>
        </Head>
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div
              className={`${styles.postContent} ${styles.previwContent}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className={styles.continueReading}>
              Wanna continue reading?
              <Link href="/">
                <a>Subscribe now 🤗</a>
              </Link>
            </div>
          </article>
        </main>
      </>
    </div>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const prismic = getPrismicClient()
  const response = await prismic.getByUID('post', String(slug), {})
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )
  }
  // if(!session){

  // }

  return {
    props: {
      post
    },
    revalidate: 60 * 60
  }
}
