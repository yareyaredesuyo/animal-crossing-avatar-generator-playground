import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Layout } from 'components/layouts/Layout'

// https://nextjs.org/docs/basic-features/layouts
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>  
  )
  // return <Component {...pageProps} />
}

export default MyApp
