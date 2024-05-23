import React from 'react'

enum LoaderStyle {
  DARK = '#011221',
  LIGHT = '#f7c700',
}

interface LoaderProps {
  width?: number
  height?: number
  theme?: 'dark' | 'light'
}

const Loader: React.FC<LoaderProps> = ({
  width = '100%',
  height = '100%',
  theme = 'dark',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width={width}
      height={height}
      style={{
        shapeRendering: 'auto',
        display: 'block',
        background: 'transparent',
      }}
    >
      <g>
        <circle
          strokeDasharray="127.23450247038662 44.411500823462205"
          r="27"
          strokeWidth="9"
          stroke={theme === 'dark' ? LoaderStyle.DARK : LoaderStyle.LIGHT}
          fill="none"
          cy="50"
          cx="50"
        >
          <animateTransform
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          />
        </circle>
      </g>
    </svg>
  )
}

export default Loader
