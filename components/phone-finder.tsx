"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { phones } from "@/data/phones"
import { StepIndicator } from "./step-indicator"
import { PriorityOptions } from "./priority-options"
import { PriceOptions } from "./price-options"
import { FeatureOptions } from "./feature-options"
import { PhoneList } from "./phone-list"

type Step = 1 | 2 | 3
type Priority = "gaming" | "photos" | "performance" | "multitask" | null
type PriceRange = "budget" | "mid" | "premium" | null
type Feature = "battery" | "memory" | "storage" | "waterproof" | null

export default function PhoneFinder() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedPriority, setSelectedPriority] = useState<Priority>(null)
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>(null)
  const [selectedFeature, setSelectedFeature] = useState<Feature>(null)
  const [filteredPhones, setFilteredPhones] = useState(phones)

  // Replace the handleNextStep function with this version that only handles navigation
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step)
    }
  }

  // Update the priority selection handler
  const handlePrioritySelect = (priority: Priority) => {
    setSelectedPriority(priority)

    // Filter phones based on the selected priority
    let filtered = [...phones]

    // In a real app, we would apply more sophisticated filtering logic
    // This is a simplified example
    if (priority === "gaming") {
      filtered = filtered.filter((phone) => phone.features.memory >= 8)
    } else if (priority === "photos") {
      filtered = filtered.filter((phone) => phone.brand === "Google" || phone.name.includes("Ultra"))
    } else if (priority === "performance") {
      filtered = filtered.filter((phone) => phone.price >= 999)
    } else if (priority === "multitask") {
      filtered = filtered.filter((phone) => phone.features.memory >= 12)
    }

    // Apply existing price filter if set
    if (selectedPrice) {
      filtered = applyPriceFilter(filtered, selectedPrice)
    }

    // Apply existing feature filter if set
    if (selectedFeature) {
      filtered = applyFeatureFilter(filtered, selectedFeature)
    }

    setFilteredPhones(filtered)
  }

  // Update the price selection handler
  const handlePriceSelect = (price: PriceRange) => {
    setSelectedPrice(price)

    // Filter phones based on the selected price
    let filtered = [...phones]

    // Apply price filter
    filtered = applyPriceFilter(filtered, price)

    // Apply existing priority filter if set
    if (selectedPriority) {
      // Apply priority filtering (simplified)
      if (selectedPriority === "gaming") {
        filtered = filtered.filter((phone) => phone.features.memory >= 8)
      } else if (selectedPriority === "photos") {
        filtered = filtered.filter((phone) => phone.brand === "Google" || phone.name.includes("Ultra"))
      } else if (selectedPriority === "performance") {
        filtered = filtered.filter((phone) => phone.price >= 999)
      } else if (selectedPriority === "multitask") {
        filtered = filtered.filter((phone) => phone.features.memory >= 12)
      }
    }

    // Apply existing feature filter if set
    if (selectedFeature) {
      filtered = applyFeatureFilter(filtered, selectedFeature)
    }

    setFilteredPhones(filtered)
  }

  // Update the feature selection handler
  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature)

    // Filter phones based on the selected feature
    let filtered = [...phones]

    // Apply feature filter
    filtered = applyFeatureFilter(filtered, feature)

    // Apply existing priority filter if set
    if (selectedPriority) {
      // Apply priority filtering (simplified)
      if (selectedPriority === "gaming") {
        filtered = filtered.filter((phone) => phone.features.memory >= 8)
      } else if (selectedPriority === "photos") {
        filtered = filtered.filter((phone) => phone.brand === "Google" || phone.name.includes("Ultra"))
      } else if (selectedPriority === "performance") {
        filtered = filtered.filter((phone) => phone.price >= 999)
      } else if (selectedPriority === "multitask") {
        filtered = filtered.filter((phone) => phone.features.memory >= 12)
      }
    }

    // Apply existing price filter if set
    if (selectedPrice) {
      filtered = applyPriceFilter(filtered, selectedPrice)
    }

    setFilteredPhones(filtered)
  }

  // Add helper functions for filtering
  const applyPriceFilter = (phones: any[], price: PriceRange) => {
    if (price === "budget") {
      return phones.filter((phone) => phone.price <= 449)
    } else if (price === "mid") {
      return phones.filter((phone) => phone.price >= 450 && phone.price <= 999)
    } else if (price === "premium") {
      return phones.filter((phone) => phone.price >= 1000)
    }
    return phones
  }

  const applyFeatureFilter = (phones: any[], feature: Feature) => {
    if (feature === "battery") {
      return phones.filter((phone) => phone.features.battery >= 4500)
    } else if (feature === "memory") {
      return phones.filter((phone) => phone.features.memory >= 8)
    } else if (feature === "storage") {
      return phones.filter((phone) => phone.features.storage >= 256)
    } else if (feature === "waterproof") {
      return phones.filter((phone) => phone.features.waterproof)
    }
    return phones
  }

  // Update the handleStartOver function to reset filtered phones
  const handleStartOver = () => {
    setCurrentStep(1)
    setSelectedPriority(null)
    setSelectedPrice(null)
    setSelectedFeature(null)
    setFilteredPhones(phones)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="w-full py-8 text-center">
        <h1 className="text-5xl font-bold">
          Let's find your <span className="text-green-500">dream phone</span>
        </h1>

      </div>

      {/* Wizard Section */}
      <div className="w-full bg-[#3E7B8C] py-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* <div className="mb-12 text-white">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider">Data plan options</p>
            <h2 className="mb-4 text-4xl font-bold">Mix and match your plans</h2>
            <p className="text-lg">
              We all stay connected differently. That's why we've made it easy for everyone to get the data they need.
              See how much you can save when you combine Gig Unlimited and Pay As You Gig your way.
            </p>
          </div> */}

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Rest of the content remains the same */}
          <div className="mt-12 mb-8">
            {currentStep === 1 && (
              <>
                <h2 className="mb-8 text-center text-3xl font-bold text-white">What are your top priorities?</h2>
                <PriorityOptions selectedPriority={selectedPriority} setSelectedPriority={handlePrioritySelect} />
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="mb-8 text-center text-3xl font-bold text-white">How much do you want to pay?</h2>
                <PriceOptions selectedPrice={selectedPrice} setSelectedPrice={handlePriceSelect} />
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="mb-8 text-center text-3xl font-bold text-white">
                  Which of these features matter to you?
                </h2>
                <FeatureOptions selectedFeature={selectedFeature} setSelectedFeature={handleFeatureSelect} />
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {currentStep > 1 && (
              <button onClick={handleStartOver} className="text-sm font-medium text-white hover:underline">
                Start Over
              </button>
            )}
            {currentStep === 1 && <div></div>}

            <div className="flex gap-2">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-all hover:bg-white/20 hover:border-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={handleNextStep}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-all hover:bg-white/20 hover:border-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Phone List */}
      <PhoneList phones={filteredPhones} />
    </div>
  )
}

