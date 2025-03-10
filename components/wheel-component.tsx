"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface WheelComponentProps {
  segments: string[]
  segColors: string[]
  winningSegment: string
  onFinished: (winner: string) => void
  primaryColor: string
  contrastColor: string
  buttonText: string
  isOnlyOnce?: boolean
  size: number
  upDuration: number
  downDuration: number
}

// Helper functions for color manipulation
const lightenColor = (color: string, percent: number): string => {
  const num = Number.parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

const darkenColor = (color: string, percent: number): string => {
  return lightenColor(color, -percent)
}

const WheelComponent: React.FC<WheelComponentProps> = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor,
  contrastColor,
  buttonText,
  isOnlyOnce = false,
  size,
  upDuration,
  downDuration,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const currentSegment = useRef<string>("")
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawWheel()
    drawCenterButton(ctx)
  }, [])

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 40 // Increased padding for larger wheel
    const arc = (2 * Math.PI) / segments.length

    // Add a drop shadow to the entire wheel for depth
    ctx.save()
    ctx.shadowColor = "rgba(0,0,0,0.4)"
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 10
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()
    ctx.restore()

    // Draw segments with 3D effect
    for (let i = 0; i < segments.length; i++) {
      const angle = i * arc - Math.PI / 2 // Start from top

      // Create gradient for 3D effect on segments
      const startAngle = angle
      const endAngle = angle + arc
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)

      // Get base color and create lighter/darker versions for gradient
      const baseColor = segColors[i]
      const lighterColor = lightenColor(baseColor, 20)
      const darkerColor = darkenColor(baseColor, 20)

      gradient.addColorStop(0, lighterColor)
      gradient.addColorStop(0.5, baseColor)
      gradient.addColorStop(1, darkerColor)

      // Draw segment with gradient
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = gradient
      ctx.fill()

      // Add highlight edge to segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineTo(centerX, centerY)
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      const textRadius = radius * 0.65 // Adjusted for better text placement
      const textAngle = angle + arc / 2
      ctx.rotate(textAngle)
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Add text shadow for better readability
      ctx.shadowColor = "rgba(0,0,0,0.5)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1

      // Split text into multiple lines
      const maxWidth = radius * 0.5
      const words = segments[i].split(" ")
      const lines = []
      let currentLine = words[0]

      for (let n = 1; n < words.length; n++) {
        const testLine = currentLine + " " + words[n]
        const metrics = ctx.measureText(testLine)

        if (metrics.width > maxWidth) {
          lines.push(currentLine)
          currentLine = words[n]
        } else {
          currentLine = testLine
        }
      }
      lines.push(currentLine)

      // Draw each line with proper spacing
      lines.forEach((line, index) => {
        const lineOffset = (index - (lines.length - 1) / 2) * 20
        ctx.fillText(line, textRadius, lineOffset)
      })

      ctx.restore()
    }

    // Draw outer white circle with enhanced 3D effect
    ctx.save()
    // Outer glow/shadow
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI)
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 8
    ctx.shadowColor = "rgba(0,0,0,0.3)"
    ctx.shadowBlur = 15
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 5
    ctx.stroke()

    // Inner ring highlight
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI)
    ctx.strokeStyle = "rgba(255,255,255,0.7)"
    ctx.lineWidth = 2
    ctx.shadowColor = "transparent"
    ctx.stroke()
    ctx.restore()

    // Draw notches with 3D effect
    const notchCount = segments.length * 2
    for (let i = 0; i < notchCount; i++) {
      const notchAngle = (i * Math.PI * 2) / notchCount
      const innerRadius = radius + 10
      const outerRadius = radius + 20

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(centerX + innerRadius * Math.cos(notchAngle), centerY + innerRadius * Math.sin(notchAngle))
      ctx.lineTo(centerX + outerRadius * Math.cos(notchAngle), centerY + outerRadius * Math.sin(notchAngle))
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 3
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      ctx.stroke()
      ctx.restore()
    }
  }

  // Separate function to draw the static center button and pointer
  const drawCenterButton = (ctx: CanvasRenderingContext2D) => {
    const centerX = size / 2
    const centerY = size / 2
    const centerButton = 60

    // Draw center button with 3D effect
    ctx.save()
    // Button shadow
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerButton, 0, 2 * Math.PI)
    ctx.fillStyle = "#FFFFFF"
    ctx.shadowColor = "rgba(0,0,0,0.4)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 5
    ctx.fill()

    // Button border
    ctx.strokeStyle = "#E0E0E0"
    ctx.lineWidth = 2
    ctx.shadowColor = "transparent"
    ctx.stroke()

    // Button highlight (top)
    ctx.beginPath()
    ctx.arc(centerX, centerY - 5, centerButton - 10, 0, Math.PI, true)
    ctx.strokeStyle = "rgba(255,255,255,0.8)"
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()

    // Draw text in the center with slight shadow
    ctx.save()
    ctx.font = "bold 20px Arial"
    ctx.fillStyle = "#333333"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.shadowColor = "rgba(0,0,0,0.2)"
    ctx.shadowBlur = 2
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.fillText(buttonText, centerX, centerY)
    ctx.restore()

    // Draw the pin with 3D effect
    const pinAngle = -67.5 * (Math.PI / 180) // Convert -67.5 degrees to radians for alignment with "Free Month of Internet" segment
    const pinRadius = size / 2 - 40 // Same as wheel radius
    const pinX = centerX + pinRadius * Math.cos(pinAngle)
    const pinY = centerY + pinRadius * Math.sin(pinAngle)

    ctx.save()
    ctx.translate(pinX, pinY)
    ctx.rotate(pinAngle + Math.PI / 2) // Rotate pin to point inward

    // Draw pin (teardrop shape) with 3D effect
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, -15, 15, Math.PI, 2 * Math.PI) // Larger head
    ctx.lineTo(0, 20) // Longer point
    ctx.closePath()

    // Create gradient for 3D effect on pin
    const pinGradient = ctx.createLinearGradient(-15, -15, 15, 20)
    pinGradient.addColorStop(0, "#FFFFFF")
    pinGradient.addColorStop(1, "#E0E0E0")

    // Fill with gradient and add shadow
    ctx.fillStyle = pinGradient
    ctx.shadowColor = "rgba(0,0,0,0.5)"
    ctx.shadowBlur = 5
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.fill()

    // Pin border
    ctx.strokeStyle = "#CCCCCC"
    ctx.lineWidth = 1
    ctx.shadowColor = "transparent"
    ctx.stroke()

    ctx.restore()
  }

  const spin = () => {
    if (isSpinning || (isOnlyOnce && hasSpun)) return

    setIsSpinning(true)
    setHasSpun(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = size / 2
    const centerY = size / 2

    // Determine the winning segment if not specified
    let winner = winningSegment
    if (!winner || winner === "") {
      const randomIndex = Math.floor(Math.random() * segments.length)
      winner = segments[randomIndex]
    }

    // Find the winning segment index
    const winningIndex = segments.indexOf(winner)
    if (winningIndex === -1) {
      winner = segments[0]
    }

    // Calculate the stopping angle to align with horizontal position
    const arc = (2 * Math.PI) / segments.length
    const stopAngle = -(winningIndex * arc) // Remove the - Math.PI / 2 offset

    const totalRotation = 2 * Math.PI * 5 + stopAngle

    // Animation variables
    const startTime = performance.now()
    const totalDuration = upDuration + downDuration
    let currentRotation = 0

    // Animation function
    const animate = (time: number) => {
      const elapsed = time - startTime
      const progress = Math.min(elapsed / totalDuration, 1)

      // Easing function for acceleration and deceleration
      let easedProgress
      if (progress < upDuration / totalDuration) {
        // Accelerating phase
        easedProgress = (progress / (upDuration / totalDuration)) * 0.2
      } else {
        // Decelerating phase
        const deceleratingProgress = (progress - upDuration / totalDuration) / (downDuration / totalDuration)
        easedProgress = 0.2 + 0.8 * (1 - Math.pow(1 - deceleratingProgress, 3))
      }

      currentRotation = totalRotation * easedProgress

      // Clear and redraw
      ctx.clearRect(0, 0, size, size)

      // Draw rotating wheel
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(currentRotation)
      ctx.translate(-centerX, -centerY)
      drawWheel()
      ctx.restore()

      // Draw static center button and pointer
      drawCenterButton(ctx)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete
        setIsSpinning(false)
        currentSegment.current = winner
        onFinished(winner)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div style={{ width: size, height: size, position: "relative", margin: "0 auto" }}>
      <canvas ref={canvasRef} width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }} />
      <button
        onClick={spin}
        onMouseDown={() => setIsButtonPressed(true)}
        onMouseUp={() => setIsButtonPressed(false)}
        onMouseLeave={() => setIsButtonPressed(false)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) ${isButtonPressed ? "scale(0.95)" : "scale(1)"}`,
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "none",
          background: "#FFFFFF",
          boxShadow: isButtonPressed
            ? "0 1px 3px rgba(0,0,0,0.2), inset 0 2px 4px rgba(0,0,0,0.1)"
            : "0 6px 12px rgba(0,0,0,0.15), inset 0 -2px 5px rgba(255,255,255,0.8)",
          cursor: isSpinning || (isOnlyOnce && hasSpun) ? "not-allowed" : "pointer",
          pointerEvents: isSpinning || (isOnlyOnce && hasSpun) ? "none" : "all",
          zIndex: 10,
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.1s ease, box-shadow 0.1s ease, background-color 0.1s ease",
        }}
        disabled={isSpinning || (isOnlyOnce && hasSpun)}
        aria-label="Spin the wheel"
      >
        {buttonText}
      </button>
    </div>
  )
}

export default WheelComponent

