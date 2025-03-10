"use client"
import Image from "next/image"
import Link from "next/link"
import PhoneFinder from "@/components/phone-finder"
import { ChatBubble } from "@/components/ai-chat/chat-bubble"
import SpinWheel from "@/components/SpinWheel"
import { useState } from "react"

export default function OffersPage() {
  const [winner, setWinner] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const handleOnComplete = (prize: string) => {
    setWinner(prize)
    setIsSpinning(false)
    console.log("Winner:", prize);
  }
  return (
  <>
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-[42px] font-bold tracking-tight">Shop featured deals</h1>

      {/* Featured Deal */}
      <div className="mb-8 flex items-center justify-between overflow-hidden rounded-[24px] bg-[#F8F9FA] p-12">
        <div className="max-w-xl">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Get the new Samsung Galaxy S25 128GB on us
            <sup className="ml-1 text-lg">℠</sup>
          </h2>
          <p className="mb-8 text-gray-700">
            The latest from Samsung can be yours, on us. No trade-in required.
            <br />
            Get $799.99 off via 24 monthly bill credits.* Offer ends 3/26.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="rounded-full bg-[#2B4B81] px-8 py-3 font-medium text-white no-underline transition-colors hover:bg-[#1E3A6A] hover:text-white"
            >
              Shop deal
            </Link>
            <Link href="#" className="font-medium text-[#2B4B81] hover:underline">
              Details
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] w-[400px]">
          <Image
            src="/phones/s25.webp"
            alt="Samsung Galaxy S25"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Secondary Deals Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* iPhone Deal */}
        <div className="flex items-center justify-between overflow-hidden rounded-[24px] bg-[#F8F9FA] p-8">
          <div className="max-w-xs">
            <h2 className="mb-4 text-3xl font-bold leading-tight">
              Plus, save $730 on iPhone 16
              <sup className="ml-1 text-sm">℠</sup>
            </h2>
            <p className="mb-6 text-sm text-gray-700">
              The latest from Apple is on Cox Mobile, with major savings. No trade-in required. Get $730 off via 24
              monthly bill credits.* Offer ends 3/26.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="rounded-full bg-[#2B4B81] px-6 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#1E3A6A] hover:text-white"
              >
                Shop deal
              </Link>
              <Link href="#" className="text-sm font-medium text-[#2B4B81] hover:underline">
                Details
              </Link>
            </div>
          </div>
          <div className="relative h-[200px] w-[200px]">
            <Image
              src="/phones/iphone16_pro.png"
              alt="iPhone 16"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Google Pixel Deal */}
        <div className="flex items-center justify-between overflow-hidden rounded-[24px] bg-[#F8F9FA] p-8">
          <div className="max-w-xs">
            <h2 className="mb-4 text-3xl font-bold leading-tight">
              Google Pixel 9 Pro on us
              <sup className="ml-1 text-sm">℠</sup>
            </h2>
            <p className="mb-6 text-sm text-gray-700">
              No trade-in required. Get $499.99 off via 24 monthly bill credits.* Offer ends 3/26.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="rounded-full bg-[#2B4B81] px-6 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#1E3A6A] hover:text-white"
              >
                Shop deal
              </Link>
              <Link href="#" className="text-sm font-medium text-[#2B4B81] hover:underline">
                Details
              </Link>
            </div>
          </div>
          <div className="relative h-[200px] w-[200px]">
            <Image
              src="/phones/pixel9_pro.webp"
              alt="Google Pixel 8a"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </main>
    {/* <SpinWheel onComplete={handleOnComplete} isSpinning={isSpinning} setIsSpinning={setIsSpinning} /> */}
     <PhoneFinder />
     <ChatBubble />
    </>
  )
}

