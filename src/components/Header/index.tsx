'use client'

import { useEffect, useState } from 'react'
import { getGlobalPageData } from '@/data/loaders'
import Container from '../Container'
import Link from 'next/link'
import Logo from '@public/logo.svg'

const Header = () => {
  const [headerNav, setHeaderNav] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const globalPageData = await getGlobalPageData()
      setHeaderNav(globalPageData.header.route)
    }

    fetchData()
  }, [])

  return (
    <header>
      <Container>
        <Link href="/">
          <Logo />
        </Link>
        <nav></nav>
      </Container>
    </header>
  )
}

export default Header
