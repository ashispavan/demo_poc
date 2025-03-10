"use client"

import { useEffect, useState } from "react"
import WheelComponent from "./wheel-component"

interface SpinWheelProps {
  onComplete: (prize: string) => void
  isSpinning: boolean
  setIsSpinning: (spinning: boolean) => void
}

export default function SpinWheel({ onComplete, isSpinning, setIsSpinning }: SpinWheelProps) {
  const [mounted, setMounted] = useState(false)
  const [currentPrize, setCurrentPrize] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Cox.com inspired colors
  const segments = [
    "Free Month of Internet",
    "$50 Bill Credit",
    "Smart Home Device",
    "Free Premium Channels",
    "Streaming Service Trial",
    "Free Installation",
    "Router Upgrade",
    "Cox Merchandise",
  ]

  // Colors from Cox.com: orange, blue, green, and complementary colors
  const segColors = [
    "#FF7900", // Cox Orange
    "#0091DA", // Cox Blue
    "#6CC24A", // Cox Green
    "#FF9E1B", // Light Orange
    "#00B5E2", // Light Blue
    "#7ED957", // Light Green
    "#E55812", // Dark Orange
    "#005E91", // Dark Blue
  ]

  const handleComplete = (winner: string) => {
    setCurrentPrize(winner)
    // Show confetti immediately
    setShowConfetti(true)
    // Hide confetti after 5 seconds (keep this the same)
    setTimeout(() => setShowConfetti(false), 5000)
    onComplete(winner)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-[400px] bg-gray-100 rounded-full animate-pulse" />

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#3E7B8C] to-[#2A5A6A] rounded-[32px] p-12 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Wheel */}
        <div className="flex-1">
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment=""
            onFinished={handleComplete}
            primaryColor="#000000"
            contrastColor="#FFFFFF"
            buttonText="SPIN"
            isOnlyOnce={false}
            size={600}
            upDuration={100}
            downDuration={1000}
          />
        </div>

        {/* Right side - Prize Display */}
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">Your Prize</h2>
          {currentPrize ? (
            <div className="text-center">
              <p className="text-5xl font-bold mb-4">🎉</p>
              <p className="text-2xl">{currentPrize}</p>
            </div>
          ) : (
            <p className="text-xl text-white/80">Spin the wheel to win a prize!</p>
          )}
        </div>
      </div>
    </div>
  )
}

