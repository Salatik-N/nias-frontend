'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getGlobalPageData } from '@/data/loaders'
import Container from '@/components/custom/Container'
import Link from 'next/link'
import Logo from '@public/logo.svg'
import styles from './styles.module.scss'

interface NavigationItem {
  id: number
  url: string
  text: string
  isExternal: boolean
}

const Header = () => {
  const [headerNav, setHeaderNav] = useState<NavigationItem[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      const globalPageData = await getGlobalPageData()
      setHeaderNav(globalPageData.header.route)
    }

    fetchData()
  }, [])

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <nav>
            <ul className={styles.navbarMenu}>
              {headerNav &&
                headerNav.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className={`${styles.link} ${pathname === item.url ? styles.active : ''}`}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <Link href="/contact-us" className="button button-yellow">
            Contact us
          </Link>
        </div>
      </Container>
    </header>
  )
}

export default Header
