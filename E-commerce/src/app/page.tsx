import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import BestSellingProducts from "@/components/best-selling-products"
import Image from "next/image"
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section with animated text and product image */}
      <HeroSection />

      {/* Featured Products section with product cards */}
      <FeaturedProducts />

      {/* Best Selling Products section with product cards */}
      <BestSellingProducts />
    </div>
  )
}
