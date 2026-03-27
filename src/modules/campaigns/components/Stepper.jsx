import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8 overflow-x-auto">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const stepNumber = index + 1;

        return (
          <React.Fragment key={index}>
            <div className="flex items-center min-w-0 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? 'bg-slate-700 text-white'
                    : isCurrent
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <div className="ml-3 min-w-0">
                <div
                  className={`text-sm font-medium truncate ${
                    isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </div>
                <div className={`text-xs truncate ${isCurrent ? 'text-slate-600' : 'text-slate-400'}`}>
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-shrink-0 w-8 h-px mx-2 ${
                  isCompleted ? 'bg-slate-700' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
