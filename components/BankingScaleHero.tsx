"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
type StatItem = {
  value: string
  description: string
  delay: number
}
type DataPoint = {
  id: number
  left: number
  top: number
  height: number
  direction: "up" | "down"
  delay: number
}
const stats: StatItem[] = [
  {
    value: "1B+",
    description: "Help with filling\nTaxes",
    delay: 0,
  },
  {
    value: "99.9%",
    description: "Confusion Educational\nLoans",
    delay: 0.2,
  },
  {
    value: "50+",
    description: "Difficulty managing emergency\nfunds or savings",
    delay: 0.4,
  },
  {
    value: "1000+",
    description: "Overwhelmed by your\nEMI payments",
    delay: 0.6,
  },
]
const generateDataPoints = (): DataPoint[] => {
  const points: DataPoint[] = []
  const baseLeft = 1
  const spacing = 32
  for (let i = 0; i < 50; i++) {
    const direction = i % 2 === 0 ? "down" : "up"
    const height = Math.floor(Math.random() * 120) + 88
    const top = direction === "down" ? Math.random() * 150 + 250 : Math.random() * 100 - 80
    points.push({
      id: i,
      left: baseLeft + i * spacing,
      top,
      height,
      direction,
      delay: i * 0.035,
    })
  }
  return points
}

// @component: BankingScaleHero
const BankingScaleHero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [dataPoints] = useState<DataPoint[]>(generateDataPoints())
  const [typingComplete, setTypingComplete] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setTypingComplete(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleScrollToAuth = () => {
    const authSection = document.getElementById("auth-section")
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // @return
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 pt-8 sm:pt-12 md:pt-16">
        <div className="grid grid-cols-12 gap-4 sm:gap-5 gap-y-8 sm:gap-y-12 md:gap-y-16">
          <div className="col-span-12 md:col-span-6 relative z-10">
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs sm:text-sm text-[#167E6C] mb-8 sm:mb-12 px-2"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
              }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">
                <motion.span
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "auto",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="block whitespace-nowrap overflow-hidden text-[#167E6C] relative z-10"
                  style={{
                    color: "#146e96",
                  }}
                >
                  {"USER ANALYSIS"}
                </motion.span>
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: typingComplete ? [1, 0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-[#167E6C] ml-0.5 relative z-10 rounded-sm"
                  style={{
                    color: "#146e96",
                  }}
                />
              </div>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-[#111A4A] mb-4 sm:mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: "400",
              }}
            >
              Analyzing complex and confusing finances{" "}
              <span
                className="opacity-40"
                style={{
                  fontWeight: "400",
                }}
              >
                to simplify everything for you.
              </span>
            </h2>

            <p
              className="text-base sm:text-lg leading-6 text-[#111A4A] opacity-60 mt-0 mb-4 sm:mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              with setu we aim to solve the core financial problems faced by the&nbsp;people&nbsp;of&nbsp;India
            </p>

            <button
              onClick={handleScrollToAuth}
              className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-9 text-[#232730] bg-white/50 backdrop-blur-sm shadow-[0_1px_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(87,90,100,0.12)] transition-all duration-200 ease-in-out rounded-lg px-4 mt-5 text-sm group hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(87,90,100,0.18)]"
            >
              <span className="relative z-10 flex items-center gap-1">
                Learn more by trying
                <ArrowRight className="w-4 h-4 -mr-1 transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          <div className="col-span-12">
            <div className="overflow-visible pb-5">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="col-span-1">
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(4px)",
                      }}
                      animate={
                        isVisible
                          ? {
                              opacity: [0, 1, 1],
                              y: [20, 0, 0],
                              filter: ["blur(4px)", "blur(0px)", "blur(0px)"],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: stat.delay,
                        ease: [0.1, 0, 0.1, 1],
                      }}
                      className="flex flex-col gap-2"
                    >
                      <p className="text-xs sm:text-sm leading-[13.2px] sm:leading-4 text-[#7C7F88] m-0 whitespace-pre-line">
                        {stat.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BankingScaleHero }
export default BankingScaleHero
