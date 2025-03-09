interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [1, 2, 3]

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                currentStep === step
                  ? "border-black bg-black text-white"
                  : currentStep > step
                    ? "border-gray-400 bg-gray-400 text-white"
                    : "border-gray-400 bg-white text-gray-400"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && <div className="w-16 border-t border-dashed border-gray-400"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

