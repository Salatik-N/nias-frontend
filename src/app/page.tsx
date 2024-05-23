import React from 'react'

import Container from '@/components/custom/Container'
import Link from 'next/link'
import Button from '@/components/ui/Button'

import styles from './styles.module.scss'

export default async function Page() {
  return (
    <Container>
      <div className={styles.rowContentBlock}>
        <div className={styles.rowContentBlockLeft}>
          <h1 className="visuallyhidden">Hide h1 title</h1>
          <span className={styles.superhead}>Hi all. I am</span>
          <span className="h1">Name</span>
          <p className={`h2 ${styles.subtitle}`}>Front-end developer</p>
          <p>// you can also see it on my Github page</p>
          <Link
            href="https://github.com/Salatik-N"
            className={styles.gitLink}
            target="_blank"
          >
            <span className="text-light-blue">const</span>{' '}
            <span className="text-green">githubLink</span> =
            <span className="text-brown">“https://github.com/Salatik-N”</span>
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
