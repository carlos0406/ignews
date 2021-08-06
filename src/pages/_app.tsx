import { AppProps } from 'next/app'
import '../styles/global.scss'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Header } from '../components/header/index'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
