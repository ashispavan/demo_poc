"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import type { Phone } from "@/types/phone"

interface CompareModalProps {
  phones: Phone[]
  isOpen: boolean
  onClose: () => void
}

export function CompareModal({ phones, isOpen, onClose }: CompareModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Compare Phones</DialogTitle>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto bg-[#f8f9fa]">
        <div className="relative w-full">
          <button onClick={onClose} className="absolute right-0 top-0 z-50 p-2 text-gray-700 hover:opacity-75">
            <X className="h-6 w-6" />
          </button>

          {/* Phones Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-[#e9ecef] p-4 md:grid-cols-3">
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800">
                  <div className="text-2xl font-bold">{phone.specs.display.size}</div>
                  <div className="text-sm">{phone.specs.display.type}</div>
                  <div className="text-sm">{phone.specs.display.refreshRate}</div>
                </div>
              ))}
            </div>

            {/* Processor */}
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-[#f1f3f5] p-4 md:grid-cols-3">
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800">
                  <div className="text-2xl font-bold">{phone.specs.processor.name}</div>
                  <div className="text-sm">{phone.specs.processor.type}</div>
                </div>
              ))}
            </div>

            {/* Camera */}
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-[#e9ecef] p-4 md:grid-cols-3">
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800">
                  <div className="text-2xl font-bold">{phone.specs.camera.main}</div>
                  <div className="text-sm">{phone.specs.camera.mainDesc}</div>
                  <div className="mt-2 text-xl font-bold">{phone.specs.camera.selfie}</div>
                  <div className="text-sm">{phone.specs.camera.selfieDesc}</div>
                </div>
              ))}
            </div>

            {/* Battery */}
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-[#f1f3f5] p-4 md:grid-cols-3">
              {phones.map((phone) => (
                <div key={phone.id} className="text-center text-gray-800">
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
