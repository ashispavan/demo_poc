import { cn } from "@/lib/utils"
import { MessageCircle, Mail } from "lucide-react"
import Image from "next/image"

interface NotificationProps {
  id: number
  visible: boolean
}

export default function Notification({ id, visible }: NotificationProps) {
  // Different notification content based on ID
  const notifications = [
    {
      id: 1,
      sender: "John Appleseed",
      time: "now",
      message: "Do you want to join me at this cool DJ party this weekend? 🎉 🎧 🕺",
      appIcon: (
        <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
      ),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      sender: "Ashley Rico",
      time: "6m ago",
      message:
        "To you & Dawn Ramirez\nWant to come over to our place for dinner tonight? We're grilling and the kids are baking some cookies 🍪",
      appIcon: (
        <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
      ),
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      sender: "Meri Alvarez",
      time: "19m ago",
      message: "Family Reunion 🎉\nSo excited to see everyone at the reunion next week!!",
      appIcon: (
        <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
      ),
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const notification = notifications.find((n) => n.id === id) || notifications[0]

  return (
    <div
      className={cn(
        "transform transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
      )}
    >
      <div className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/80 shadow-lg border border-white/40">
        <div className="flex p-3 gap-3">
          <div className="flex-shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/80">
              <Image
                src={notification.avatar || "/placeholder.svg"}
                alt={notification.sender}
                width={40}
                height={40}
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0">{notification.appIcon}</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="font-bold text-sm text-black">{notification.sender}</div>
              <div className="text-xs text-rose-500 font-medium">{notification.time}</div>
            </div>
            <div className="text-sm mt-0.5 whitespace-pre-line text-black/90">{notification.message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

