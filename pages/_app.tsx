import type { AppProps } from 'next/app'
import { RedditProvider } from '../context/RedditContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RedditProvider>
      <Component {...pageProps} />
    </RedditProvider>
  )
}

export default MyApp
