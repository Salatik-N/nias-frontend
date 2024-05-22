import '../styles/index.scss'
import type { Metadata } from 'next'
import Header from '../components/custom/Header'
import { getGlobalPageMetadata } from '@/data/loaders'
import { Fira_Code } from 'next/font/google'

const fira = Fira_Code({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata()

  return {
    title: metadata?.title,
    description: metadata?.description,
  }
}

interface ContainerProps {
  children: React.ReactNode
}

const RootLayout: React.FC<ContainerProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={fira.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
export default RootLayout
