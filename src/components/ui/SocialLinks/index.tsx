import React from 'react'

import styles from './styles.module.scss'
import { ISocialLink } from '@/types/ISocialLink'

interface SocialLinksProps {
  socialLinks: ISocialLink[]
}
const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  return (
    <div className={styles.socialLinks}>
      {socialLinks.map((link) => (
        <a
          className={styles.socialLinksItem}
          key={link.id}
          href={link.url}
          target={link.isExternal ? '_blank' : '_self'}
          rel={link.isExternal ? 'noopener noreferrer' : ''}
        >
          <i className={`icon-${link.icon.toLowerCase()}`} />
        </a>
      ))}
    </div>
  )
}
export default SocialLinks
