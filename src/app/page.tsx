import React from 'react'

import Container from '@/components/custom/Container'
import Link from 'next/link'
import Button from '@/components/ui/Button'

import styles from './page.module.scss'

export default async function Page() {
  return (
    <Container>
      <div className={styles.rowContentBlock}>
        <div className={styles.rowContentBlockLeft}>
          <span className={styles.superhead}>Hi all. I am</span>
          <span className="h1">Name</span>
          <p className="h2">Front-end developer</p>
          <p>// you can also see it on my Github page</p>
          <Link href="https://github.com/Salatik-N" target="_blank">
            const githubLink = “https://github.com/Salatik-N”
          </Link>
          <Button variant="yellow" href="/projects">
            Projects
          </Button>
        </div>
        <div className={styles.rowContentBlockRight}></div>
      </div>
    </Container>
  )
}
