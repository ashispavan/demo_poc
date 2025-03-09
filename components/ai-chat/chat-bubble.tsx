"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { ChatWindow } from "./chat-window"

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [bubbleVisible, setBubbleVisible] = useState(true)
  const [windowVisible, setWindowVisible] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen) {
      // Start bubble exit animation
      setBubbleVisible(false)

      // After bubble animation completes, show the window
      timer = setTimeout(() => {
        setWindowVisible(true)
      }, 300)
    } else {
      // Hide window first
      setWindowVisible(false)

      // After window animation completes, show the bubble
      timer = setTimeout(() => {
        setBubbleVisible(true)
      }, 300)
    }

    return () => clearTimeout(timer)
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Window */}
      {windowVisible && (
        <div className="animate-fadeIn">
          <ChatWindow onClose={toggleChat} />
        </div>
      )}

      {/* Chat Bubble */}
      <div className={`transition-all duration-300 ${bubbleVisible ? "opacity-100" : "opacity-0"}`}>
        <button
          onClick={toggleChat}
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 
            ${bubbleVisible ? "scale-100 rotate-0" : "scale-0 rotate-90"}`}
          aria-label="Open AI Chat"
          style={{ transformOrigin: "center" }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

