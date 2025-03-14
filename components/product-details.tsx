"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Phone } from "@/types/phone"
import { Phone3DViewer } from "./3d/phone-model"

interface ProductDetailsProps {
  phone: Phone
}

type CustomerType = "new" | "existing" | null
type StorageOption = "128" | "256" | "512"
type PaymentType = "monthly" | "onetime"
type ProtectionPlan = "premium" | "none"

export function ProductDetails({ phone }: ProductDetailsProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [customerType, setCustomerType] = useState<CustomerType>(null)
  const [storage, setStorage] = useState<StorageOption>("128")
  const [paymentType, setPaymentType] = useState<PaymentType>("monthly")
  const [protection, setProtection] = useState<ProtectionPlan>("none")

  const images = [phone.image, "/phones/pixel9_1.png", "/phones/pixel9_2.png", "/phones/pixel9_3.png", "/phones/pixel9_4.mp4"]

  const colors = [
    { name: "Blue", class: "bg-blue-200", value: "#b0c4de" },
    { name: "Titanium", class: "bg-gray-400", value: "#a0a0a0" },
    { name: "Mint", class: "bg-mint-300", value: "#98ff98" },
  ]

  const [selectedColor, setSelectedColor] = useState(colors[0])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to devices
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="relative flex flex-col lg:flex-row">
          {/* Left Column - Images (Fixed) */}
          <div className="lg:fixed lg:w-[calc(50%-2rem)] lg:max-w-[600px]">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
              {currentImage === 0 ? (
                <Phone3DViewer color={selectedColor.value} />
              ) : currentImage === 4 ? (
                <video
                  src={images[currentImage]}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <Image
                  src={images[currentImage] || "/placeholder.svg"}
                  alt={phone.name}
                  fill
                  className="object-contain p-8"
                />
              )}

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="mt-4 flex justify-center gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    "h-20 w-20 rounded-2xl border-2 bg-white p-2 transition",
                    currentImage === idx ? "border-blue-500" : "border-transparent hover:border-gray-300",
                  )}
                >
                  <div className="relative h-full w-full">
                    {idx === 0 ? (
                      <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500">
                        3D View
                      </div>
                    ) : idx === 4 ? (
                      <div className="h-full w-full bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="text-[10px] text-gray-500 mt-1">Video</div>
                      </div>
                    ) : (
                      <Image src={img || "/placeholder.svg"} alt="" fill className="object-contain" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Configuration (Scrollable) */}
          <div className="mt-8 lg:mt-0 lg:ml-auto lg:w-1/2 lg:pl-8">
            <h1 className="text-4xl font-medium">
              {phone.brand} {phone.name}
            </h1>
            <p className="mt-2 text-lg text-gray-600">From ${phone.price}/mo.</p>

            {/* Customer Type */}
            <div className="mt-8">
              <h2 className="text-lg font-medium">Are you a new or existing customer?</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {["new", "existing"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCustomerType(type as CustomerType)}
                    className={cn(
                      "rounded-2xl border-2 bg-white px-6 py-4 text-center transition",
                      customerType === type ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <span className="font-medium capitalize">{type} customer</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h2 className="text-lg font-medium">Choose your finish</h2>
              <div className="mt-4 flex gap-4">
                {colors.map((color) => (
                  <button key={color.name} className="group relative" onClick={() => setSelectedColor(color)}>
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full border-2 border-transparent transition group-hover:border-gray-300",
                        selectedColor.name === color.name && "ring-2 ring-blue-500 ring-offset-2",
                        color.class,
                      )}
                    />
                    <span className="absolute left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-sm">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="mt-12">
              <h2 className="text-lg font-medium">Storage capacity</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {["128", "256", "512"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setStorage(size as StorageOption)}
                    className={cn(
                      "rounded-2xl border-2 bg-white p-4 text-center transition",
                      storage === size ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="font-medium">{size}GB</div>
                    <div className="mt-1 text-sm text-gray-600">
                      {size === "128" ? "From $799" : size === "256" ? "From $899" : "From $1099"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Options */}
            <div className="mt-12">
              <h2 className="text-lg font-medium">Payment options</h2>
              <div className="mt-4 space-y-4">
                <button
                  onClick={() => setPaymentType("monthly")}
                  className={cn(
                    "w-full rounded-2xl border-2 bg-white p-4 text-left transition",
                    paymentType === "monthly" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Monthly payments</div>
                      <div className="mt-1 text-sm text-gray-600">From $33.29/mo.</div>
                    </div>
                    <div className="text-xl font-medium text-blue-500">$33.29/mo.</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentType("onetime")}
                  className={cn(
                    "w-full rounded-2xl border-2 bg-white p-4 text-left transition",
                    paymentType === "onetime" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">One-time payment</div>
                      <div className="mt-1 text-sm text-gray-600">Full price</div>
                    </div>
                    <div className="text-xl font-medium text-blue-500">$799.99</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Protection Plan */}
            <div className="mt-12">
              <h2 className="text-lg font-medium">COX Coverage</h2>
              <div className="mt-4 space-y-4">
                <button
                  onClick={() => setProtection("premium")}
                  className={cn(
                    "w-full rounded-2xl border-2 bg-white p-4 text-left transition",
                    protection === "premium" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Premium Protection</div>
                      <div className="mt-1 text-sm text-gray-600">Hardware coverage and 24/7 priority support</div>
                    </div>
                    <div className="text-xl font-medium text-blue-500">$12.00/mo.</div>
                  </div>
                </button>

                <button
                  onClick={() => setProtection("none")}
                  className={cn(
                    "w-full rounded-2xl border-2 bg-white p-4 text-left transition",
                    protection === "none" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">No protection plan</div>
                      <div className="mt-1 text-sm text-gray-600">Limited 1-year warranty only</div>
                    </div>
                    <div className="text-xl font-medium">$0.00</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-12 rounded-2xl bg-gray-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">Your {phone.name}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {storage}GB • {selectedColor.name} •{" "}
                    {paymentType === "monthly" ? "Monthly payments" : "One-time payment"}
                  </div>
                </div>
                <div className="text-2xl font-medium">{paymentType === "monthly" ? "$33.29/mo." : "$799.99"}</div>
              </div>
              <button className="mt-6 w-full rounded-full bg-blue-500 px-8 py-4 text-lg font-medium text-white transition hover:bg-blue-600">
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

