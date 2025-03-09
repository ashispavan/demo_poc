"use client"

import { Battery, Cpu, HardDrive, Droplet } from "lucide-react"

interface FeatureOptionsProps {
  selectedFeature: string | null
  setSelectedFeature: (feature: any) => void
}

export function FeatureOptions({ selectedFeature, setSelectedFeature }: FeatureOptionsProps) {
  const options = [
    {
      id: "battery",
      icon: <Battery className="h-6 w-6" />,
      label: "Battery life",
    },
    {
      id: "memory",
      icon: <Cpu className="h-6 w-6" />,
      label: "Memory",
    },
    {
      id: "storage",
      icon: <HardDrive className="h-6 w-6" />,
      label: "Storage capacity",
    },
    {
      id: "waterproof",
      icon: <Droplet className="h-6 w-6" />,
      label: "Waterproof",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {options.map((option) => (
        <button
          key={option.id}
          className={`flex h-[100px] flex-col items-center justify-center rounded-lg border p-4 transition-all hover:border-green-300 ${
            selectedFeature === option.id ? "border-green-500 bg-white" : "border-gray-200 bg-white"
          }`}
          onClick={() => setSelectedFeature(option.id)}
        >
          {option.icon}
          <span className="mt-2 text-center text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

