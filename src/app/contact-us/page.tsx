'use client'

import React, { useEffect, useState } from 'react'

import ContactForm from '@/components/forms/ContactUsForm'
import Container from '@/components/custom/Container'
import { getContactPageData } from '@/data/loaders'
import SocialLinks from '@/components/ui/SocialLinks'
import { ISocialLink } from '@/types/ISocialLink'
import { ISeoData } from '@/types/ISeoData'

import styles from './styles.module.scss'

interface ContactPageData {
  createdAt: string
  description: string
  id: number
  meta: Record<string, any>
  publishedAt: string
  seo_data: ISeoData
  socialLink: ISocialLink[]
  title: string
  updatedAt: string
}

const initialValues: ContactPageData = {
  createdAt: '',
  description: '',
  id: 0,
  meta: {},
  publishedAt: '',
  seo_data: {
    description: '',
    hide_h1: '',
    id: 0,
    title: '',
  },
  socialLink: [],
  title: '',
  updatedAt: '',
}
export default function ContactUsRoute() {
  const [contactPageData, setContactPageData] =
    useState<ContactPageData>(initialValues)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getContactPageData()
      setContactPageData(response as ContactPageData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log(contactPageData, 'contactPageData')
  }, [contactPageData])

  return (
    <Container>
      <h1 className="visuallyhidden">hiden title</h1>
      <span className={styles.pageTitle}>_contacts</span>
      <div className={styles.contactUs}>
        <div className={styles.contactUsLeft}>
          <span className="h1">Contact Us</span>
          <p className="h2">
            {'>'} Do you want to get an assessment of the project?
          </p>
          <SocialLinks socialLinks={contactPageData?.socialLink} />
        </div>
        <div className={styles.contactUsRight}>
          <ContactForm />
        </div>
      </div>
    </Container>
  )
}
