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
                  ? "border-white bg-white text-[#3E7B8C]"
                  : currentStep > step
                    ? "border-white/50 bg-white/50 text-[#3E7B8C]"
                    : "border-white/30 bg-transparent text-white"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && <div className="w-16 border-t border-dashed border-white/30"></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

