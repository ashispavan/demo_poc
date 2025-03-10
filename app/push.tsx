"use client"

import { useState, useRef, useEffect } from "react"
import { Play } from "lucide-react"
import PhoneFrame from "@/components/phone-frame"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [paths, setPaths] = useState({
    leftPath: "M 0,0 C 0,0 0,0 0,0",
    rightPath: "M 0,0 C 0,0 0,0 0,0",
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const leftPhoneRef = useRef<HTMLDivElement>(null)
  const rightPhoneRef = useRef<HTMLDivElement>(null)

  // Calculate paths based on element positions
  useEffect(() => {
    const calculatePaths = () => {
      if (!containerRef.current || !buttonRef.current || !leftPhoneRef.current || !rightPhoneRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const leftPhoneRect = leftPhoneRef.current.getBoundingClientRect()
      const rightPhoneRect = rightPhoneRef.current.getBoundingClientRect()

      // Calculate positions relative to container
      const buttonX = buttonRect.left + buttonRect.width / 2 - containerRect.left
      const buttonY = buttonRect.top + buttonRect.height / 2 - containerRect.top

      const leftPhoneX = leftPhoneRect.left + leftPhoneRect.width / 2 - containerRect.left
      const leftPhoneY = leftPhoneRect.top - containerRect.top

      const rightPhoneX = rightPhoneRect.left + rightPhoneRect.width / 2 - containerRect.left
      const rightPhoneY = rightPhoneRect.top - containerRect.top

      // Create curved paths
      const leftPath = `M ${buttonX},${buttonY} C ${buttonX - 50},${buttonY + 50} ${leftPhoneX + 50},${leftPhoneY - 50} ${leftPhoneX},${leftPhoneY}`
      const rightPath = `M ${buttonX},${buttonY} C ${buttonX + 50},${buttonY + 50} ${rightPhoneX - 50},${rightPhoneY - 50} ${rightPhoneX},${rightPhoneY}`

      setPaths({ leftPath, rightPath })
    }

    // Calculate on mount and window resize
    calculatePaths()
    window.addEventListener("resize", calculatePaths)

    // Small delay to ensure elements are rendered
    const timeout = setTimeout(calculatePaths, 100)

    return () => {
      window.removeEventListener("resize", calculatePaths)
      clearTimeout(timeout)
    }
  }, [])

  const handlePlayClick = () => {
    setShowNotifications(true)

    // Reset notifications after some time
    setTimeout(() => {
      setShowNotifications(false)
    }, 10000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div ref={containerRef} className="relative flex flex-col items-center max-w-3xl w-full">
        {/* Play button in the center top */}
        <div className="mb-16 md:mb-24 relative z-20">
          <Button
            ref={buttonRef}
            onClick={handlePlayClick}
            variant="outline"
            size="icon"
            className="h-24 w-24 rounded-full border-none bg-gradient-to-b from-emerald-400 to-emerald-600 text-white hover:from-emerald-300 hover:to-emerald-500 shadow-[0_10px_15px_-3px_rgba(16,185,129,0.3),0_4px_6px_-4px_rgba(16,185,129,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] active:translate-y-0.5 active:shadow-[0_5px_10px_-3px_rgba(16,185,129,0.3),0_2px_4px_-2px_rgba(16,185,129,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-all duration-150 relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent h-1/2"></div>
            <div className="absolute inset-0 rounded-full border border-emerald-700/30"></div>
            <Play
              className="h-12 w-12 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] relative z-10 fill-white"
              fill="currentColor"
              stroke="white"
              strokeWidth={1}
            />
            <span className="sr-only">Play</span>
          </Button>
        </div>

        {/* Connection paths with animated dots */}
        <svg
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500",
            showNotifications ? "opacity-100" : "opacity-0",
          )}
          style={{ zIndex: 10 }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left path */}
          <path
            d={paths.leftPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Right path */}
          <path
            d={paths.rightPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Animated dots */}
          <circle r="5" fill="#10b981" filter="url(#glow)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path={paths.leftPath} />
          </circle>

          <circle r="5" fill="#10b981" filter="url(#glow)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path={paths.rightPath} />
          </circle>
        </svg>

        {/* Two phones side by side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
          <div ref={leftPhoneRef} className="flex-1 flex justify-center">
            <PhoneFrame
              showNotifications={showNotifications}
              notificationIds={[1]}
              wallpaperGradient="from-red-900 via-red-600 to-yellow-500"
            />
          </div>
          <div ref={rightPhoneRef} className="flex-1 flex justify-center">
            <PhoneFrame
              showNotifications={showNotifications}
              notificationIds={[2]}
              wallpaperGradient="from-blue-900 via-purple-600 to-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

