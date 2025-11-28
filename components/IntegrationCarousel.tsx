"use client"

import { useEffect, useRef } from "react"
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
    logo: "/images/logoipsum-389.png",
  },
  {
    name: "Integration 2",
    logo: "/images/logoipsum-407.png",
  },
  {
    name: "Integration 3",
    logo: "/images/logoipsum-379.png",
  },
  {
    name: "Integration 4",
    logo: "/images/logoipsum-374.png",
  },
  {
    name: "Integration 5",
    logo: "/images/logoipsum-381.png",
  },
  {
    name: "Integration 6",
    logo: "/images/logoipsum-401.png",
  },
  {
    name: "Integration 7",
    logo: "/images/logoipsum-403.png",
  },
  {
    name: "Integration 1",
    logo: "/images/logoipsum-389.png",
  },
  {
    name: "Integration 2",
    logo: "/images/logoipsum-407.png",
  },
  {
    name: "Integration 3",
    logo: "/images/logoipsum-379.png",
  },
  {
    name: "Integration 4",
    logo: "/images/logoipsum-374.png",
  },
  {
    name: "Integration 5",
    logo: "/images/logoipsum-381.png",
  },
]
const defaultBottomRowApps: IntegrationApp[] = [
  {
    name: "Integration 6",
    logo: "/images/logoipsum-401.png",
  },
  {
    name: "Integration 7",
    logo: "/images/logoipsum-403.png",
  },
  {
    name: "Integration 1",
    logo: "/images/logoipsum-389.png",
  },
  {
    name: "Integration 2",
    logo: "/images/logoipsum-407.png",
  },
  {
    name: "Integration 3",
    logo: "/images/logoipsum-379.png",
  },
  {
    name: "Integration 4",
    logo: "/images/logoipsum-374.png",
  },
  {
    name: "Integration 5",
    logo: "/images/logoipsum-381.png",
  },
  {
    name: "Integration 6",
    logo: "/images/logoipsum-401.png",
  },
  {
    name: "Integration 7",
    logo: "/images/logoipsum-403.png",
  },
  {
    name: "Integration 1",
    logo: "/images/logoipsum-389.png",
  },
  {
    name: "Integration 2",
    logo: "/images/logoipsum-407.png",
  },
  {
    name: "Integration 3",
    logo: "/images/logoipsum-379.png",
  },
]

// @component: IntegrationCarousel
const IntegrationCarousel = ({
  buttonText = "Explore Integrations",
  buttonHref = "#",
  title = "Integrates with your entire collaboration stack.",
  subtitle = "Connect Finance SETU to Slack, Zoom, Notion, Google Meet, and dozens of others to analyze communication seamlessly.",
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
  return null
}

export { IntegrationCarousel }
export default IntegrationCarousel
