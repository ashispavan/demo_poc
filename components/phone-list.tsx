"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import type { Phone } from "@/types/phone"
import { Button } from "@/components/ui/button"
import { CompareModal } from "./compare-modal"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"

interface PhoneListProps {
  phones: Phone[]
  selectedPriority?: string | null
  selectedPrice?: string | null
  selectedFeature?: string | null
  onRemoveFilter?: (filterType: "priority" | "price" | "feature") => void
}

export function PhoneList({
  phones,
  selectedPriority,
  selectedPrice,
  selectedFeature,
  onRemoveFilter,
}: PhoneListProps) {
  const [selectedPhones, setSelectedPhones] = useState<string[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)

  const handleToggleCompare = (phoneId: string) => {
    setSelectedPhones((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter((id) => id !== phoneId)
      }
      if (prev.length >= 4) {
        return prev
      }
      return [...prev, phoneId]
    })
  }

  const phonesToCompare = phones.filter((phone) => selectedPhones.includes(phone.id))

  return (
    <>
      <div className="w-full py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <p className="text-sm text-gray-700">
                {phones.length === 6
                  ? `Our recommendations for you - ${phones.length} result(s)`
                  : `Showing all - ${phones.length} result(s)`}
              </p>

              {selectedPriority && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Priority: {selectedPriority}
                  <button
                    onClick={() => onRemoveFilter?.("priority")}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${selectedPriority} filter`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {selectedPrice && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Price: {selectedPrice}
                  <button
                    onClick={() => onRemoveFilter?.("price")}
                    className="ml-1 text-green-500 hover:text-green-700 focus:outline-none"
                    aria-label={`Remove ${selectedPrice} filter`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {selectedFeature && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Feature: {selectedFeature}
                  <button
                    onClick={() => onRemoveFilter?.("feature")}
                    className="ml-1 text-purple-500 hover:text-purple-700 focus:outline-none"
                    aria-label={`Remove ${selectedFeature} filter`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {phones.map((phone) => (
              <div key={phone.id} className="flex flex-col items-center">
                <div className="relative mb-4 h-[250px] w-full rounded-lg bg-gray-50 p-4">
                  <div className="absolute left-2 top-2 rounded bg-gradient-to-r from-green-500 to-blue-500 px-2 py-1">
                    <span className="text-xs text-white">New</span>
                  </div>
                  <div className="absolute right-2 top-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedPhones.includes(phone.id)}
                        onCheckedChange={() => handleToggleCompare(phone.id)}
                        disabled={selectedPhones.length >= 4 && !selectedPhones.includes(phone.id)}
                        id={`compare-${phone.id}`}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <label htmlFor={`compare-${phone.id}`} className="text-xs text-gray-600 cursor-pointer">
                        Compare
                      </label>
                    </div>
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <Image
                      src={phone.image || "/placeholder.svg"}
                      alt={phone.name}
                      width={150}
                      height={300}
                      className="h-auto max-h-full w-auto"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold">{phone.brand}</h3>
                  <h4 className="text-xl font-bold">{phone.name}</h4>
                  <p className="text-sm text-gray-700">From ${phone.price.toLocaleString()}</p>

                  <Link
                    href={`/phones/${phone.id}`}
                    className="mt-4 flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    <span className="mr-1">Buy now</span>
                    <Plus className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Compare Button */}
      {selectedPhones.length > 1 && (
        <div className="fixed bottom-8 right-28 z-40">
          <Button size="lg" onClick={() => setIsCompareOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            Compare ({selectedPhones.length})
          </Button>
        </div>
      )}

      {/* Compare Modal */}
      <CompareModal phones={phonesToCompare} isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} />
    </>
  )
}

