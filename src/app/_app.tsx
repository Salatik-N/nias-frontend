import { AppContext, AppInitialProps } from 'next/app'
import { Inter } from "next/font/google";
import Layout from './layout'
import '../styles/index.scss'

const inter = Inter({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppContext & AppInitialProps) => {
    return (
        <>
            <Layout>
                <main className={inter.className}>
                    <Component {...pageProps} />
                </main>
            </Layout>
        </>
    )
}

export default MyApp
