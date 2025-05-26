import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper function to conditionally join class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price with currency
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price)
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, currentPrice: number) {
  if (!originalPrice || !currentPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}
