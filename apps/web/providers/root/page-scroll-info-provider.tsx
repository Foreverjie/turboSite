import { useState } from 'react'

const usePageScrollLocationSelector = () => {
  const [y, setY] = useState(0)
  return {
    y,
    setY,
  }
}

export { usePageScrollLocationSelector }
