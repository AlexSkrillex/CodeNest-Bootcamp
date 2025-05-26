"use client"

import { useState, useRef } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

// Sample product data (reusing the same data for demonstration)
const products = [
  {
    id: "1",
    name: "Casual Cotton T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Leather Jacket",
    price: 149.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "5",
    name: "Wireless Headphones",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "6",
    name: "Smartwatch",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function BestSellingProducts() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Number of products to show at once
  const productsToShow = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  }

  // Calculate max index based on screen size
  const getMaxIndex = () => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return products.length - productsToShow.mobile
      } else if (window.innerWidth < 1024) {
        return products.length - productsToShow.tablet
      }
    }
    return products.length - productsToShow.desktop
  }

  // Scroll functions for carousel
  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
    if (containerRef.current) {
      const itemWidth = containerRef.current.scrollWidth / products.length
      containerRef.current.scrollTo({
        left: (currentIndex - 1) * itemWidth,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    const maxIndex = getMaxIndex()
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
    if (containerRef.current) {
      const itemWidth = containerRef.current.scrollWidth / products.length
      containerRef.current.scrollTo({
        left: (currentIndex + 1) * itemWidth,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          onAnimationComplete={() => setIsVisible(true)}
        >
          {/* Section title with green background */}
          <div className="flex justify-between items-center mb-8">
            <div className="inline-block rounded-md bg-green-600 px-4 py-2 text-white">
              <h2 className="text-lg font-bold">Best Selling Product</h2>
            </div>

            {/* Navigation arrows for desktop */}
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                aria-label="Previous products"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                disabled={currentIndex >= getMaxIndex()}
                aria-label="Next products"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product carousel */}
          <div className="relative">
            <div
              ref={containerRef}
              className="flex space-x-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 md:overflow-x-visible md:space-x-0 scroll-smooth"
            >
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  className="min-w-[250px] md:min-w-0"
                />
              ))}
            </div>

            {/* Navigation arrows for mobile */}
            <div className="flex justify-end gap-2 mt-4 md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                aria-label="Previous products"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                disabled={currentIndex >= getMaxIndex()}
                aria-label="Next products"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Pagination indicators */}
            <div className="flex justify-center mt-4 space-x-1">
              {Array.from({ length: getMaxIndex() + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-4 bg-primary" : "w-2 bg-muted"
                  }`}
                  onClick={() => {
                    setCurrentIndex(i)
                    if (containerRef.current) {
                      const itemWidth = containerRef.current.scrollWidth / products.length
                      containerRef.current.scrollTo({
                        left: i * itemWidth,
                        behavior: "smooth",
                      })
                    }
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
