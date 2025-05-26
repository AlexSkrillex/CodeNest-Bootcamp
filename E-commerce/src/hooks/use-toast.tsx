"use client"

// This is a simplified version of the toast hook
// In a real application, you would use a proper toast library

import { useState } from "react"

type ToastProps = {
  id: string
  title: string
  description?: string
  type?: "default" | "success" | "error" | "warning"
  duration?: number
}

// Simple toast implementation
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...props, id }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, props.duration || 3000)

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return { toast, dismiss, toasts }
}

// Export a singleton instance for global use
export const toast = (props: ToastProps) => {
  // In a real app, this would use a context or global state
  // For simplicity, we'll just log to console in this example
  console.log("Toast:", props.title, props.description)

  // Show an alert for demonstration purposes
  if (typeof window !== "undefined") {
    const message = `${props.title}${props.description ? `\n${props.description}` : ""}`
    // Uncomment to show actual alerts (can be annoying during development)
    // alert(message)
  }

  return "toast-id"
}
