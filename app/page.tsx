import PhoneFinder from "@/components/phone-finder"
import { ChatBubble } from "@/components/ai-chat/chat-bubble"

export default function Home() {
  return (
    <main className="min-h-screen">
      <PhoneFinder />
      <ChatBubble />
    </main>
  )
}

