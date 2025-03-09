"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"
import { StreamingText } from "./streaming-text"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
  isNew?: boolean
}

interface ChatWindowProps {
  onClose: () => void
}

// Function to convert markdown-style links to HTML
function convertLinksToHTML(text: string): string {
  // Pattern to match [text](url)
  const linkPattern = /\[([^\]]+)\]$$([^)]+)$$/g

  return text.replace(linkPattern, (match, linkText, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700 transition-colors">${linkText}</a>`
  })
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm your AI assistant. How can I help you find the perfect phone today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Remove isNew flag after animation
  useEffect(() => {
    const newMessages = messages.filter((m) => m.isNew)
    if (newMessages.length > 0) {
      const timers = newMessages.map((message) => {
        return setTimeout(() => {
          setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, isNew: false } : msg)))
        }, 500)
      })

      return () => {
        timers.forEach((timer) => clearTimeout(timer))
      }
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      isNew: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "Based on your preferences, I'd recommend checking out the Samsung Galaxy S25 Ultra. It has excellent battery life and a powerful camera system. <a href=\"https://www.samsung.com\">Link</a>",
        "The Google Pixel 9 Pro might be a good fit for your needs. It offers a clean Android experience with regular updates. <a href=\"https://store.google.com\">Link</a>",
        "If you're looking for value, the Samsung Galaxy S25 offers a great balance of features at a more affordable price point. <a href=\"https://www.samsung.com/galaxy\">Link</a>",
        "For photography enthusiasts, both the Samsung Galaxy S25 Ultra and Google Pixel 9 Pro XL offer exceptional camera systems. <a href=\"https://www.gsmarena.com\">Link</a>",
        "Have you considered battery life as a priority? The Samsung models typically offer excellent battery performance. <a href=\"https://www.phonearena.com/batteries\">Link</a>",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        isStreaming: true,
        isNew: true,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Mark message as no longer streaming after it's complete
      setTimeout(
        () => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, isStreaming: false } : msg)),
          )
          setIsTyping(false)
        },
        randomResponse.length * 30 + 500,
      ) // Approximate time to finish streaming
    }, 500)
  }

  return (
    <div className="ai-chat flex h-[450px] w-[350px] flex-col rounded-lg bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3">
        <h3 className="font-medium">AI Phone Assistant</h3>
        <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100" aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3">
        {messages.map((message) => (
          <div key={message.id} className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 transition-all duration-300 ${
                message.isNew
                  ? message.role === "user"
                    ? "animate-[slideInRight_0.3s_ease-out]"
                    : "animate-[slideInLeft_0.3s_ease-out]"
                  : ""
              } ${message.role === "user" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"}`}
            >
              {message.role === "assistant" && message.isStreaming ? (
                <StreamingText text={message.content} />
              ) : message.role === "assistant" ? (
                <span dangerouslySetInnerHTML={{ __html: convertLinksToHTML(message.content) }} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isTyping && !messages[messages.length - 1]?.isStreaming && (
          <div className="mb-3 flex justify-start animate-[fadeIn_0.3s_ease-out]">
            <div className="max-w-[80%] rounded-lg bg-gray-100 p-3 text-gray-800">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-gray-400 typing-dot"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 typing-dot"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about phones..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white transition-all disabled:opacity-50 hover:bg-green-600"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

