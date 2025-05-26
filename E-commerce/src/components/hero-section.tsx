"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShoppingBag, TrendingUp, Award, Clock, RotateCcw } from "lucide-react"

export default function HeroSection() {
  // Animation for the hero text
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left side content */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Discover Your Style,
              <br />
              Elevate Your Life
            </h1>
            <p className="text-muted-foreground md:text-xl max-w-[600px]">
              Shop the latest trends with confidence. Quality products, seamless experience, and fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button className="gap-2" size="lg">
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </Button>
              <Button variant="outline" size="lg">
                Explore Collections
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <TrendingUp className="h-5 w-5 text-rose-500" />
                <span className="text-sm font-medium">Trending Styles</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium">Premium Quality</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Clock className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <RotateCcw className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-medium">Easy Returns</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative h-[400px] w-[400px] md:h-[500px] md:w-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Smart Watch"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute bottom-0 right-0 bg-background/80 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium">New Collection Available Now</p>
                <p className="text-xs text-muted-foreground">Limited time offer: Get 20% off your first order</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
