import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Loader from '@/components/ui/Loader'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  href?: string
  className?: string
  variant: 'yellow' | 'gray' | 'white'
  children: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
  target?: '_blank' | '_self'
  rel?: 'nofollow'
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  href,
  variant,
  children,
  onClick,
  isLoading = false,
  target = '_self',
  rel,
}) => {
  const classNames = `${styles[variant]} ${className}`
  const loaderTheme = variant === 'yellow' ? 'dark' : 'light'

  if (href) {
    return (
      <Link href={href} className={classNames} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader theme={loaderTheme} /> : children}
    </button>
  )
}

export default Button
