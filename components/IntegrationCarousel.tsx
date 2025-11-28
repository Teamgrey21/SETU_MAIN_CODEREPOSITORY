"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
type IntegrationApp = {
  name: string
  logo: string
}
type IntegrationCarouselProps = {
  buttonText?: string
  buttonHref?: string
  title?: string
  subtitle?: string
  topRowApps?: IntegrationApp[]
  bottomRowApps?: IntegrationApp[]
}
const defaultTopRowApps: IntegrationApp[] = [
  {
    name: "Integration 1",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-389-Hc8XBOUI8vkVmIwWQZs33kxMF353Xj.png",
  },
  {
    name: "Integration 2",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-407-eyikTTM6ccO0f4I7ZmNk5LpFI4EKOG.png",
  },
  {
    name: "Integration 3",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-379-5hDaxwIw4LzjwXzWuorEXi7ESrGYl1.png",
  },
  {
    name: "Integration 4",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-374-bp0RaoVnQI1JMqR9fjessWI8v33kLV.png",
  },
  {
    name: "Integration 5",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-381-eKw7vkCp2Wq9hivZJaN1ERJdjCqR0d.png",
  },
  {
    name: "Integration 6",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-401-F6mjMLGEZt4HAohKA889Z8Gf5fMzIw.png",
  },
  {
    name: "Integration 7",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-403-HnBAGFYWgxxMGrH2PI45UorQOsQHFo.png",
  },
  {
    name: "Integration 1",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-389-Hc8XBOUI8vkVmIwWQZs33kxMF353Xj.png",
  },
  {
    name: "Integration 2",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-407-eyikTTM6ccO0f4I7ZmNk5LpFI4EKOG.png",
  },
  {
    name: "Integration 3",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-379-5hDaxwIw4LzjwXzWuorEXi7ESrGYl1.png",
  },
  {
    name: "Integration 4",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-374-bp0RaoVnQI1JMqR9fjessWI8v33kLV.png",
  },
  {
    name: "Integration 5",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-381-eKw7vkCp2Wq9hivZJaN1ERJdjCqR0d.png",
  },
]
const defaultBottomRowApps: IntegrationApp[] = [
  {
    name: "Integration 6",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-401-F6mjMLGEZt4HAohKA889Z8Gf5fMzIw.png",
  },
  {
    name: "Integration 7",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-403-HnBAGFYWgxxMGrH2PI45UorQOsQHFo.png",
  },
  {
    name: "Integration 1",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-389-Hc8XBOUI8vkVmIwWQZs33kxMF353Xj.png",
  },
  {
    name: "Integration 2",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-407-eyikTTM6ccO0f4I7ZmNk5LpFI4EKOG.png",
  },
  {
    name: "Integration 3",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-379-5hDaxwIw4LzjwXzWuorEXi7ESrGYl1.png",
  },
  {
    name: "Integration 4",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-374-bp0RaoVnQI1JMqR9fjessWI8v33kLV.png",
  },
  {
    name: "Integration 5",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-381-eKw7vkCp2Wq9hivZJaN1ERJdjCqR0d.png",
  },
  {
    name: "Integration 6",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-401-F6mjMLGEZt4HAohKA889Z8Gf5fMzIw.png",
  },
  {
    name: "Integration 7",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-403-HnBAGFYWgxxMGrH2PI45UorQOsQHFo.png",
  },
  {
    name: "Integration 1",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-389-Hc8XBOUI8vkVmIwWQZs33kxMF353Xj.png",
  },
  {
    name: "Integration 2",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-407-eyikTTM6ccO0f4I7ZmNk5LpFI4EKOG.png",
  },
  {
    name: "Integration 3",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoipsum-379-5hDaxwIw4LzjwXzWuorEXi7ESrGYl1.png",
  },
]

// @component: IntegrationCarousel
export const IntegrationCarousel = ({
  buttonText = "Explore Integrations",
  buttonHref = "#",
  title = "Integrates with your entire collaboration stack.",
  subtitle = "Connect Auralink to Slack, Zoom, Notion, Google Meet, and dozens of others to analyze communication seamlessly.",
  topRowApps = defaultTopRowApps,
  bottomRowApps = defaultBottomRowApps,
}: IntegrationCarouselProps) => {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let topAnimationId: number
    let bottomAnimationId: number
    let topPosition = 0
    let bottomPosition = 0
    const animateTopRow = () => {
      if (topRowRef.current) {
        topPosition -= 0.5
        if (Math.abs(topPosition) >= topRowRef.current.scrollWidth / 2) {
          topPosition = 0
        }
        topRowRef.current.style.transform = `translateX(${topPosition}px)`
      }
      topAnimationId = requestAnimationFrame(animateTopRow)
    }
    const animateBottomRow = () => {
      if (bottomRowRef.current) {
        bottomPosition -= 0.65
        if (Math.abs(bottomPosition) >= bottomRowRef.current.scrollWidth / 2) {
          bottomPosition = 0
        }
        bottomRowRef.current.style.transform = `translateX(${bottomPosition}px)`
      }
      bottomAnimationId = requestAnimationFrame(animateBottomRow)
    }
    topAnimationId = requestAnimationFrame(animateTopRow)
    bottomAnimationId = requestAnimationFrame(animateBottomRow)
    return () => {
      cancelAnimationFrame(topAnimationId)
      cancelAnimationFrame(bottomAnimationId)
    }
  }, [])

  // @return
  return (
    null
  )
}
