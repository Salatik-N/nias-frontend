'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/custom/Container'
import styles from './styles.module.scss'
import { getAboutPageData } from '@/data/loaders'

interface RateSkills {
  id: number
  title: string
}

interface Skills {
  id: number
  title: string
  rate: number
  skill: RateSkills[]
}

interface AbouPage {
  id: number
  title: string
  description: string
  skills: Skills[]
}

export default function AboutUsRoute() {
  const [aboutPageData, setAboutPageData] = useState<AbouPage>(Object)

  useEffect(() => {
    const fetchData = async () => {
      const aboutPageData = await getAboutPageData()
      console.log(aboutPageData)
      setAboutPageData(aboutPageData)
    }

    fetchData()
  }, [])

  function rateBlock(rate: number) {
    const totalStars = 5

    return (
      <div className={styles.rate}>
        {[...Array(totalStars)].map((_, i) => (
          <span
            key={i}
            className={`${styles.rateItem} ${i < rate ? styles.rateFilled : ''}`}
          ></span>
        ))}
      </div>
    )
  }

  function formatDescription(description: string) {
    console.log(aboutPageData)
    return description
      .split('\n')
      .map((line, index) => <li key={index}>{line}</li>)
  }

  return (
    Object.keys(aboutPageData).length > 0 && (
      <Container>
        <h1 className="visuallyhidden">Hide h1 title</h1>
        <span className={styles.pageTitle}>{aboutPageData.title}</span>
        <div className={styles.rowContentBlock}>
          <div className={styles.rowContentBlockLeft}>
            <ol>{formatDescription(aboutPageData.description)}</ol>
          </div>
          <div className={styles.rowContentBlockRight}>
            <span>// Skills</span>
            {aboutPageData.skills &&
              aboutPageData.skills.map((skill) => (
                <div key={skill.id} className={styles.skillItem}>
                  <div className={styles.skillItemHeader}>
                    <span className={styles.title}>{skill.title}</span>
                    {rateBlock(skill.rate)}
                  </div>
                  <div className={styles.skillItemText}>
                    {skill.skill &&
                      skill.skill.map((rateSkill) => (
                        <p key={rateSkill.id}>
                          {'>'} {rateSkill.title}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
    )
  )
}
