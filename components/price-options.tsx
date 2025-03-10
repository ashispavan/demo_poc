"use client"

interface PriceOptionsProps {
  selectedPrice: string | null
  setSelectedPrice: (price: any) => void
}

export function PriceOptions({ selectedPrice, setSelectedPrice }: PriceOptionsProps) {
  const options = [
    {
      id: "budget",
      symbol: "$",
      range: "Up to $449",
    },
    {
      id: "mid",
      symbol: "$$",
      range: "$450 - $999",
    },
    {
      id: "premium",
      symbol: "$$$",
      range: "$1000 and +",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {options.map((option) => (
        <button
          key={option.id}
          className={`flex flex-col items-center justify-center rounded-lg border p-6 transition-all 
hover:border-green-600 hover:border-2 hover:shadow-lg  hover:bg-green-100 hover:text-green-700 
${selectedPrice === option.id ? "border-green-500 border-2 bg-green-100" : "border-gray-200 bg-white"}`}
          onClick={() => setSelectedPrice(option.id)}
        >
          <span className="text-xl font-medium">{option.symbol}</span>
          <span className="mt-2 text-center text-sm">{option.range}</span>
        </button>
      ))}
    </div>
  )
}

