"use client"

import { useState, useEffect, useRef } from "react"

interface StreamingTextProps {
  text: string
  speed?: number
}

// Function to convert markdown-style links to HTML
function convertLinksToHTML(text: string): string {
  // Pattern to match [text](url)
  const linkPattern = /\[([^\]]+)\]$$([^)]+)$$/g

  return text.replace(linkPattern, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700 transition-colors">${linkText}</a>`
  })
}

export function StreamingText({ text, speed = 30 }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [processedText, setProcessedText] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const textRef = useRef(text)
  const indexRef = useRef(0)

  // Update the text reference when the text prop changes
  useEffect(() => {
    textRef.current = text
    indexRef.current = 0
    setDisplayedText("")

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set up the streaming interval
    intervalRef.current = setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        // Add one character at a time
        setDisplayedText((prev) => prev + textRef.current.charAt(indexRef.current))
        indexRef.current++
      } else {
        // Clear interval when done
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, speed)

    // Cleanup on unmount or when text changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, speed])

  // Process the displayed text to convert links to HTML
  useEffect(() => {
    setProcessedText(convertLinksToHTML(displayedText))
  }, [displayedText])

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />
}

