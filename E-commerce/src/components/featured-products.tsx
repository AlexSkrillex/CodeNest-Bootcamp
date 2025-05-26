"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductFilter from "@/components/product-filter"

// Extended sample product data
const allProducts = [
  {
    id: "1",
    name: "Casual Cotton T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    tags: ["casual", "summer"],
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    tags: ["casual", "denim"],
  },
  {
    id: "3",
    name: "Leather Jacket",
    price: 149.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    tags: ["outerwear", "winter"],
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "footwear",
    tags: ["sports", "athletic"],
  },
  {
    id: "5",
    name: "Wireless Headphones",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    tags: ["audio", "tech"],
  },
  {
    id: "6",
    name: "Smartwatch",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    tags: ["tech", "wearable"],
  },
  {
    id: "7",
    name: "Backpack",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "accessories",
    tags: ["travel", "casual"],
  },
  {
    id: "8",
    name: "Sunglasses",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "accessories",
    tags: ["summer", "fashion"],
  },
]

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 200],
    sortBy: "default",
  })

  // Products per page
  const productsPerPage = 4

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Filter by category
    if (filters.category !== "all" && product.category !== filters.category) {
      return false
    }

    // Filter by price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "name-a-z":
        return a.name.localeCompare(b.name)
      case "name-z-a":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of product section
    document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle filter change
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
    setCurrentPage(1) // Reset to first page when filters change
  }

  return (
    <section id="featured-products" className="w-full py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          onAnimationComplete={() => setIsVisible(true)}
        >
          {/* Section title with red background */}
          <div className="inline-block mb-8 rounded-md bg-red-600 px-4 py-2 text-white">
            <h2 className="text-lg font-bold">Featured Products</h2>
          </div>

          {/* Filter and sort controls */}
          <ProductFilter filters={filters} onFilterChange={handleFilterChange} totalProducts={sortedProducts.length} />

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
              />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Show all products button */}
          {sortedProducts.length > productsPerPage && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={() => (window.location.href = "/shop")} className="mt-4">
                View All Products
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
