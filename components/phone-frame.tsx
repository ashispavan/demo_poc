"use client"

import { useState, useEffect } from "react"
import Notification from "./notification"

interface PhoneFrameProps {
  showNotifications: boolean
  notificationIds?: number[]
  wallpaperGradient?: string
}

export default function PhoneFrame({
  showNotifications,
  notificationIds = [1, 2],
  wallpaperGradient = "from-red-900 via-red-600 to-yellow-500",
}: PhoneFrameProps) {
  const [notifications, setNotifications] = useState<
    Array<{
      id: number
      visible: boolean
      delay: number
    }>
  >([])

  // Update the notifications array based on provided IDs
  useEffect(() => {
    if (showNotifications) {
      const newNotifications = notificationIds.map((id, index) => ({
        id,
        visible: false,
        delay: 500 + index * 1000,
      }))

      setNotifications(newNotifications)

      // Show each notification after its delay
      newNotifications.forEach((notification) => {
        setTimeout(() => {
          setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, visible: true } : n)))
        }, notification.delay)
      })
    } else {
      // Hide all notifications
      setNotifications([])
    }
  }, [showNotifications, notificationIds])

  const currentTime = new Date()
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`

  const currentDate = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }
  const formattedDate = currentDate.toLocaleDateString("en-US", options)

  return (
    <div className="relative w-[260px] h-[540px]">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[40px] border-8 border-black bg-black shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-30" />

        {/* Screen */}
        <div className={`relative h-full w-full overflow-hidden rounded-[32px] bg-gradient-to-b ${wallpaperGradient}`}>
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-2 z-20">
            <div className="text-white text-xs font-medium">{formattedTime}</div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-white/20" />
              <div className="w-4 h-4 rounded-full bg-white/20" />
              <div className="w-4 h-4 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Date and time */}
          <div className="absolute top-12 left-0 right-0 text-center text-white">
            <div className="text-sm font-medium">{formattedDate}</div>
            <div className="text-6xl font-semibold mt-1">{formattedTime}</div>
          </div>

          {/* Notifications container */}
          <div className="absolute top-32 left-0 right-0 px-3 space-y-3 z-10">
            {notifications.map((notification, index) => (
              <Notification key={`${notification.id}-${index}`} id={notification.id} visible={notification.visible} />
            ))}
          </div>

          {/* Bottom icons */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16">
            <div className="w-12 h-12 rounded-full bg-blue-500/80 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/90 rounded-sm" />
            </div>
            <div className="w-12 h-12 rounded-full bg-teal-500/80 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/90 rounded-sm" />
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white/80 rounded-full" />
        </div>
      </div>
    </div>
  )
}

