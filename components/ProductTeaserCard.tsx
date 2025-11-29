"use client"
import { motion } from "framer-motion"

type ProductTeaserCardProps = {
  dailyVolume?: string
  dailyVolumeLabel?: string
  headline?: string
  subheadline?: string
  description?: string
  videoSrc?: string
  posterSrc?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

// @component: ProductTeaserCard
const ProductTeaserCard = (props: ProductTeaserCardProps) => {
  const {
    dailyVolume = "1,430,992,688",
    dailyVolumeLabel = "DAILY ANALYZED MESSAGES",
    headline = "The Smart Layer Between You and Financial Clarity",
    subheadline = "Setu tackles your toughest money problems-loans, EMIs, investment taxes, startup filings-and explains every step, giving you the knowledge and control you deserve.",
    description = "Trusted by fast-growing teams and enterprises, Finance SETU powers smarter communication across 1,000+ organizations — with enterprise-grade security, multilingual analysis, and instant emotional detection.",
    videoSrc = "https://cdn.sanity.io/files/1t8iva7t/production/a2cbbed7c998cf93e7ecb6dae75bab42b13139c2.mp4",
    posterSrc = "/images/design-mode/9ad78a5534a46e77bafe116ce1c38172c60dc21a-1069x1068.png",
    primaryButtonText = "Start analyzing",
    primaryButtonHref = "",
    secondaryButtonText = "View API Docs",
    secondaryButtonHref = "",
  } = props

  // @return
  return (
    <section className="w-full px-4 sm:px-8 pt-12 sm:pt-24 lg:pt-32 pb-6 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 lg:gap-8">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            className="col-span-1 bg-[#e9e9e9] rounded-2xl sm:rounded-3xl lg:rounded-[40px] p-4 sm:p-6 lg:p-12 flex flex-col justify-end aspect-square overflow-hidden"
          >
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight tracking-tight text-[#202020] max-w-full lg:max-w-[520px] mb-3 sm:mb-4 lg:mb-6"
              style={{
                fontWeight: "500",
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk'",
              }}
            >
              {headline}
            </h1>

            <p
              className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-[#404040] max-w-full lg:max-w-[520px]"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {subheadline}
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
              delay: 0.2,
            }}
            className="col-span-1 bg-white rounded-2xl sm:rounded-3xl lg:rounded-[40px] flex justify-center items-center aspect-video sm:aspect-square lg:aspect-square overflow-hidden"
            style={{
              backgroundImage: "url(/images/gemini-generated-image-upu3ngupu3ngupu3.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Video element removed, now using background image only */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { ProductTeaserCard }
export default ProductTeaserCard
