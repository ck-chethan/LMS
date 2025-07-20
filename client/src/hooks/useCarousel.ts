import { useEffect, useState } from 'react'

interface UseCarouselProps {
  totalImages: number
  interval?: number
}

export const useCarousel = ({
  totalImages,
  interval = 3000,
}: UseCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % totalImages)
    }, interval)

    return () => clearInterval(imageInterval)
  }, [totalImages, interval])

  return currentImage
}
