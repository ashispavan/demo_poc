"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus } from "lucide-react"
import type { Phone } from "@/types/phone"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CompareModal } from "./compare-modal"
import Link from "next/link"
import { Switch } from "./ui/switch"

interface PhoneListProps {
  phones: Phone[]
}

export function PhoneList({ phones }: PhoneListProps) {
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
      <div className="w-full py-8 min-h-[950px]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <p className="text-sm text-gray-700">
              {phones.length === 6
                ? `Our recommendations for you - ${phones.length} result(s)`
                : `Showing all - ${phones.length} result(s)`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {phones.map((phone) => (
              <div key={phone.id} className="flex flex-col items-center">
                <div className="relative mb-4 h-[250px] w-full rounded-lg bg-gray-50 p-4">
                  <div className="absolute left-2 top-2 rounded bg-gray-100 px-2 py-1">
                    <span className="text-xs">New</span>
                  </div>
                  <div className="absolute right-2 top-2 flex items-center gap-2">
                    <Switch
                      checked={selectedPhones.includes(phone.id)}
                      onCheckedChange={() => handleToggleCompare(phone.id)}
                      disabled={selectedPhones.length >= 3 && !selectedPhones.includes(phone.id)}
                      id={`compare-${phone.id}`}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <label htmlFor={`compare-${phone.id}`} className="text-xs text-gray-600 cursor-pointer">
                      Compare
                    </label>
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
                    className="mt-4 no-underline flex items-center justify-center rounded-full bg-[#00a846] hover:bg-[#155530] px-4 py-2 text-white hover:text-white"
                  >
                    <span className="mr-1">Buy now</span>
                    {/* <Plus className="h-4 w-4" /> */}
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
          <Button size="lg" onClick={() => setIsCompareOpen(true)} className="bg-[#285a93] hover:bg-[#155530] rounded-full">
            Compare ({selectedPhones.length})
          </Button>
        </div>
      )}

      {/* Compare Modal */}
      <CompareModal phones={phonesToCompare} isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} />
    </>
  )
}

