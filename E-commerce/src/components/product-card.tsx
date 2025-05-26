"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"

// Product card component with hover animations and wishlist functionality
export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  className,
}: {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  className?: string
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addItem, isInCart } = useCart()

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  // Handle add to cart
  const handleAddToCart = () => {
    addItem({ id, name, price, image })
    toast({
      id: "add-to-cart",
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      id: "wishlist-toggle",
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <motion.div
      className={cn("group relative rounded-xl border bg-background p-4 transition-all", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 opacity-70 transition-opacity hover:opacity-100"
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground",
          )}
        />
      </Button>

      {/* Product image with hover effect */}
      <div className="relative aspect-square overflow-hidden rounded-md mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className={cn("object-cover transition-transform duration-300", isHovered ? "scale-105" : "scale-100")}
        />
      </div>

      {/* Product details */}
      <div className="space-y-2">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <Button className="mt-4 w-full gap-2" onClick={handleAddToCart} variant={isInCart(id) ? "secondary" : "default"}>
        <ShoppingCart className="h-4 w-4" />
        {isInCart(id) ? "Added to Cart" : "Add to Cart"}
      </Button>
    </motion.div>
  )
}
