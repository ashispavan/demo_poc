"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Phone } from "@/types/phone"

interface CompareModalProps {
  phones: Phone[]
  isOpen: boolean
  onClose: () => void
}

export function CompareModal({ phones, isOpen, onClose }: CompareModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-[#f8f9fa] max-w-[1200px]" phoneCount={phones.length}>
        <div className="relative w-full">
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 z-50 p-2 text-gray-700 hover:opacity-75 bg-white rounded-full shadow-md"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Phones Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[120px_1fr_1fr_1fr]">
            <div className="hidden md:block w-[120px]" /> {/* Placeholder column */}
            {phones.map((phone) => (
              <div key={phone.id} className="relative text-center">
                <Image
                  src={phone.image || "/placeholder.svg"}
                  alt={phone.name}
                  width={200}
                  height={400}
                  className="mx-auto h-48 w-auto object-contain"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-800">{`${phone.brand} ${phone.name}`}</h3>
              </div>
            ))}
          </div>

          {/* Specs Comparison */}
          <div className="mt-8 space-y-6">
            {/* Display */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_1fr_1fr]">
              <div className="hidden md:flex items-center justify-center p-4 font-semibold text-gray-600 bg-gray-100 rounded-lg">
                Display
              </div>
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800 rounded-lg bg-[#e9ecef] p-4">
                  <div className="text-2xl font-bold">{phone.specs.display.size}</div>
                  <div className="text-sm">{phone.specs.display.type}</div>
                  <div className="text-sm">{phone.specs.display.refreshRate}</div>
                </div>
              ))}
            </div>

            {/* Processor */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_1fr_1fr]">
              <div className="hidden md:flex items-center justify-center p-4 font-semibold text-gray-600 bg-gray-100 rounded-lg">
                Processor
              </div>
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800 rounded-lg bg-[#f1f3f5] p-4">
                  <div className="text-2xl font-bold">{phone.specs.processor.name}</div>
                  <div className="text-sm">{phone.specs.processor.type}</div>
                </div>
              ))}
            </div>

            {/* Camera */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_1fr_1fr]">
              <div className="hidden md:flex items-center justify-center p-4 font-semibold text-gray-600 bg-gray-100 rounded-lg">
                Camera
              </div>
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800 rounded-lg bg-[#e9ecef] p-4">
                  <div className="text-2xl font-bold">{phone.specs.camera.main}</div>
                  <div className="text-sm">{phone.specs.camera.mainDesc}</div>
                  <div className="mt-2 text-xl font-bold">{phone.specs.camera.selfie}</div>
                  <div className="text-sm">{phone.specs.camera.selfieDesc}</div>
                </div>
              ))}
            </div>

            {/* Battery */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_1fr_1fr]">
              <div className="hidden md:flex items-center justify-center p-4 font-semibold text-gray-600 bg-gray-100 rounded-lg">
                Battery
              </div>
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800 rounded-lg bg-[#f1f3f5] p-4">
                  <div className="text-2xl font-bold">{phone.specs.battery.capacity}</div>
                  <div className="text-sm">{phone.specs.battery.charging}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

