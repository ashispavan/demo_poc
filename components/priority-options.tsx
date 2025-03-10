"use client"

import { Gamepad, Camera, Settings, Layers } from "lucide-react"

interface PriorityOptionsProps {
  selectedPriority: string | null
  setSelectedPriority: (priority: any) => void
}

export function PriorityOptions({ selectedPriority, setSelectedPriority }: PriorityOptionsProps) {
  const options = [
    {
      id: "gaming",
      icon: <Gamepad className="h-6 w-6" />,
      label: "Watch videos and play games",
    },
    {
      id: "photos",
      icon: <Camera className="h-6 w-6" />,
      label: "Take photos and create content",
    },
    {
      id: "performance",
      icon: <Settings className="h-6 w-6" />,
      label: "Performance over the years",
    },
    {
      id: "multitask",
      icon: <Layers className="h-6 w-6" />,
      label: "Multitask effortlessly",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {options.map((option) => (
        <button
          key={option.id}
          className={`flex h-[100px] flex-col items-center justify-center rounded-lg border p-4 transition-all 
hover:border-green-600 hover:border-2 hover:shadow-lg  hover:bg-green-100 hover:text-green-700 
${selectedPriority === option.id ? "border-green-500 border-2 bg-green-100" : "border-gray-200 bg-white"}`}
          onClick={() => setSelectedPriority(option.id)}
        >
          {option.icon}
          <span className="mt-2 text-center text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

