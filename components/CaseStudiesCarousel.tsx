"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
type CaseStudy = {
  id: string
  company: string
  logo: React.ReactNode
  title: string
  features: string[]
  quote: string
  attribution: string
  accentColor: string
  cards: {
    type: "slack" | "meeting" | "sentiment" | "notion" | "stripe" | "figma"
    delay: number
    zIndex: number
  }[]
}
const caseStudies: CaseStudy[] = [
  {
    id: "notion",
    company: "Clandestine",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 38 48" width="38" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m14.25 5c0 7.8701-6.37994 14.25-14.25 14.25v9.5h14.25v14.25h9.5c0-7.8701 6.3799-14.25 14.25-14.25v-9.5h-14.25v-14.25z"
          fill="#16b364"
        />
      </svg>
    ),
    title: "Setu asks you about your financial personality to understand you better as your financial friend",
    features: ["Ask Setu", "Personal Finance", "Financial Summaries"],
    quote: "Auralink gives us clarity on team alignment we never had before.",
    attribution: "Marie Chen, Head of Operations, Clandestine",
    accentColor: "#16b364",
    cards: [
      {
        type: "notion",
        delay: 0,
        zIndex: 1,
      },
      {
        type: "slack",
        delay: 0.1,
        zIndex: 2,
      },
    ],
  },
  {
    id: "cloudwatch",
    company: "Cloudwatch",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 192 48" width="192" xmlns="http://www.w3.org/2000/svg">
        <filter
          id="a"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="54"
          width="48"
          x="0"
          y="-3"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" mode="normal" result="effect1_innerShadow_3046_38742" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="effect1_innerShadow_3046_38742" mode="normal" result="effect2_innerShadow_3046_38742" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology in="SourceAlpha" operator="erode" radius="1" result="effect3_innerShadow_3046_38742" />
          <feOffset />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0" />
          <feBlend in2="effect2_innerShadow_3046_38742" mode="normal" result="effect3_innerShadow_3046_38742" />
        </filter>
        <g filter="url(#a)">
          <rect fill="url(#b)" height="48" rx="12" width="48" />
        </g>
        <g clipPath="url(#c)">
          <path
            d="m23.9995 14.25c5.3848 0 9.7505 4.3658 9.7505 9.7506s-4.3657 9.7505-9.7505 9.7505-9.7506-4.3657-9.7506-9.7505 4.3658-9.7506 9.7506-9.7506z"
            fill="#fff"
          />
          <path d="m23.9995 18.0005c-3.3137 0-6 2.6863-6 6s2.6863 6 6 6 6-2.6863 6-6-2.6863-6-6-6z" fill="url(#d)" />
        </g>
        <text fill="currentColor" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" x="58" y="32">
          Cloudwatch
        </text>
        <defs>
          <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="24" x2="24" y1="0" y2="48">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="23.9995" x2="23.9995" y1="18.0005" y2="30.0005">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
          <clipPath id="c">
            <rect fill="#fff" height="36" rx="6" width="36" x="6" y="6" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Conversations with Setu get converted into detailed financial reports",
    features: ["Ask Setu", "Personal Finance", "Financial Summaries"],
    quote: "With Auralink, we can see collaboration patterns that directly impact our product velocity.",
    attribution: "Sarah Chen, VP Engineering, Cloudwatch",
    accentColor: "#3b82f6",
    cards: [
      {
        type: "stripe",
        delay: 0,
        zIndex: 1,
      },
      {
        type: "slack",
        delay: 0.1,
        zIndex: 2,
      },
    ],
  },
  {
    id: "eightball",
    company: "EightBall",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 151 48" width="151" xmlns="http://www.w3.org/2000/svg">
        <g fill="#0A0D12"></g>
      </svg>
    ),
    title: "Setu not only tells you about your finances but teaches you about everything too",
    features: ["Ask Setu", "Financial Summaries"],
    quote: "Auralink transformed how we understand our remote-first culture.",
    attribution: "Karri Saarinen, Co-founder, EightBall",
    accentColor: "#0A0D12",
    cards: [
      {
        type: "meeting",
        delay: 0,
        zIndex: 1,
      },
      {
        type: "slack",
        delay: 0.1,
        zIndex: 2,
      },
    ],
  },
]
const FeatureBadge = ({
  name,
}: {
  name: string
}) => {
  const getIcon = (featureName: string) => {
    if (featureName.includes("Slack")) {
      return null
    } else if (featureName.includes("Meeting")) {
      return null
    } else if (featureName.includes("Sentiment")) {
      return null
    }
    return null
  }
  return (
    <div className="flex items-center gap-2 bg-white/75 shadow-sm border border-black/5 rounded-lg px-2 py-1 text-sm font-medium text-foreground">
      {getIcon(name)}
      {name}
    </div>
  )
}
const SlackCallCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return null
}
const MeetingTranscriptCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return null
}
const SentimentReportCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return null
}
const NotionCollaborationCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay,
      }}
      className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-200px, -80px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Team Alignment</h4>
          <span className="text-xs text-muted-foreground">Real-time</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-foreground">Design Team</span>
            </div>
            <span className="text-sm font-semibold text-green-600">96%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-foreground">Engineering</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">94%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm text-foreground">Product</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">92%</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">12</span> active conversations
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const StripeGlobalCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="relative w-full h-full flex items-center justify-center"
    ></motion.div>
  )
}

const FigmaSprintCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay,
      }}
      className="absolute w-[380px] rounded-xl p-6 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 8px 32px 0 rgba(0, 0, 0, 0.12)",
        filter: "drop-shadow(0 4px 6px rgba(30, 30, 44, 0.15))",
        transform: "translate(-190px, -70px)",
        zIndex,
      }}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: accentColor }}
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Sprint Planning</h4>
              <p className="text-xs text-muted-foreground">Week 3 • Day 2</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Design handoff clarity</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "94%" }} />
              </div>
              <span className="text-xs font-semibold text-foreground">94%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Team sentiment</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "89%" }} />
              </div>
              <span className="text-xs font-semibold text-foreground">89%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-foreground">Friction detection</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-green-600">Low</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Blockers identified</span>
            <span className="font-semibold text-foreground">2</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const CaseStudiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const currentStudy = caseStudies[currentIndex]
  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isAutoPlaying, currentIndex])
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }
  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-24 px-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1
            className="text-[40px] leading-tight font-normal text-foreground mb-6 tracking-tight"
            style={{
              fontWeight: "400",
              fontFamily: "var(--font-figtree), Figtree",
              fontSize: "40px",
            }}
          >
            Learn and Rewrite Your Finance with Setu
          </h1>
          <p
            className="text-lg leading-7 text-muted-foreground max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            See how you can get help with your finances while learning and get control&nbsp;over&nbsp;your&nbsp;money
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStudy.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
                className="space-y-6"
              >
                <h2
                  className="text-4xl font-bold text-foreground leading-tight tracking-tight"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                    fontWeight: "400",
                    fontSize: "32px",
                  }}
                >
                  {currentStudy.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {currentStudy.features.map((feature, idx) => (
                    <FeatureBadge key={idx} name={feature} />
                  ))}
                </div>

                <blockquote className="border-l-4 border-primary pl-6 py-2">
                  <p
                    className="text-lg leading-7 text-foreground/80 italic mb-3"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    "{currentStudy.quote}"
                  </p>
                  
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Previous slide"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Next slide"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Card Visualization */}
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStudy.id}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentStudy.id === "notion" && (
                  <>
                    <NotionCollaborationCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                    <SlackCallCard accentColor={currentStudy.accentColor} delay={0.1} zIndex={2} />
                  </>
                )}
                {currentStudy.id === "cloudwatch" && (
                  <>
                    <StripeGlobalCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                    <SlackCallCard accentColor={currentStudy.accentColor} delay={0.1} zIndex={2} />
                  </>
                )}
                {currentStudy.id === "eightball" && (
                  <>
                    <MeetingTranscriptCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                    <SlackCallCard accentColor={currentStudy.accentColor} delay={0.1} zIndex={2} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
