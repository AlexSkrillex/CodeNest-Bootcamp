"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatPrice } from "@/lib/utils"

// Categories for filter
const categories = [
  { value: "all", label: "All Categories" },
  { value: "clothing", label: "Clothing" },
  { value: "footwear", label: "Footwear" },
  { value: "accessories", label: "Accessories" },
  { value: "electronics", label: "Electronics" },
]

// Sort options
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" },
]

export default function ProductFilter({
  filters,
  onFilterChange,
  totalProducts,
}: {
  filters: any
  onFilterChange: (filters: any) => void
  totalProducts: number
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setLocalPriceRange(value)
  }

  // Apply filters
  const applyFilters = () => {
    onFilterChange({ priceRange: localPriceRange })
    setMobileFiltersOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setLocalPriceRange([0, 200])
    onFilterChange({
      category: "all",
      priceRange: [0, 200],
      sortBy: "default",
    })
  }

  return (
    <div className="mb-8">
      {/* Desktop filters */}
      <div className="hidden md:flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category:
            </Label>
            <Select value={filters.category} onValueChange={(value: any) => onFilterChange({ category: value })}>
              <SelectTrigger className="w-[180px]" id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price range filter */}
          <div className="flex items-center gap-2">
            <Label htmlFor="price-range" className="text-sm font-medium">
              Price:
            </Label>
            <div className="w-[200px] flex items-center gap-2">
              <Slider
                id="price-range"
                min={0}
                max={200}
                step={5}
                value={filters.priceRange}
                onValueChange={(value: any) => onFilterChange({ priceRange: value })}
                className="w-full"
              />
              <span className="text-sm whitespace-nowrap">
                {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              </span>
            </div>
          </div>

          {/* Reset filters button */}
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        {/* Sort and results count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{totalProducts} products</span>

          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="text-sm font-medium">
              Sort by:
            </Label>
            <Select value={filters.sortBy} onValueChange={(value: any) => onFilterChange({ sortBy: value })}>
              <SelectTrigger className="w-[180px]" id="sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter products by category, price, and more.</SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              {/* Category filter */}
              <div className="space-y-2">
                <Label htmlFor="mobile-category" className="text-sm font-medium">
                  Category
                </Label>
                <Select value={filters.category} onValueChange={(value: any) => onFilterChange({ category: value })}>
                  <SelectTrigger className="w-full" id="mobile-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price range filter */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="mobile-price-range" className="text-sm font-medium">
                    Price Range
                  </Label>
                  <span className="text-sm">
                    {formatPrice(localPriceRange[0])} - {formatPrice(localPriceRange[1])}
                  </span>
                </div>
                <Slider
                  id="mobile-price-range"
                  min={0}
                  max={200}
                  step={5}
                  value={localPriceRange}
                  onValueChange={handlePriceRangeChange}
                  className="w-full"
                />
              </div>

              {/* Sort options */}
              <div className="space-y-2">
                <Label htmlFor="mobile-sort" className="text-sm font-medium">
                  Sort by
                </Label>
                <Select value={filters.sortBy} onValueChange={(value: any) => onFilterChange({ sortBy: value })}>
                  <SelectTrigger className="w-full" id="mobile-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-6">
              <Button className="flex-1" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="outline" className="flex-1" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile sort dropdown */}
        <div className="flex items-center gap-2">
          <Select value={filters.sortBy} onValueChange={(value: any) => onFilterChange({ sortBy: value })}>
            <SelectTrigger className="w-[140px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-sm text-muted-foreground">{totalProducts} products</span>
        </div>
      </div>
    </div>
  )
}
