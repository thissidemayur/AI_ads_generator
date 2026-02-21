import { useState, useEffect } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Database,
  Cpu,
  Cloud,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GenerationStatusProps {
  active: boolean;
}

export const GenerationStatus = ({ active }: GenerationStatusProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Queuing Job", icon: Clock },
    { label: "Inference Engine", icon: Cpu },
    { label: "Post-Processing", icon: Database },
    { label: "Storage Upload", icon: Cloud },
  ];

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 80); // Simulating 8 seconds of processing

      return () => clearInterval(interval);
    } else {
      setProgress(0);
      setCurrentStep(0);
    }
  }, [active]);

  useEffect(() => {
    setCurrentStep(Math.min(Math.floor(progress / 25), 3));
  }, [progress]);

  if (!active) return null;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -z-10" />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              Active Pipeline
            </h3>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
              Job_ID: #882-AFK-01
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Loader2 className="w-3 h-3 text-primary animate-spin" />
            <span className="text-[10px] font-bold text-primary uppercase">
              Processing
            </span>
          </div>
        </div>

        {/* Progress Logic */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-xs font-medium text-zinc-300">
              {progress === 100
                ? "Generation Complete"
                : steps[currentStep].label}
            </p>
            <span className="text-xl font-bold text-white font-mono">
              {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-zinc-900" />
        </div>

        {/* Lifecycle Steps - Requirement 3 */}
        <div className="grid grid-cols-4 gap-2 mt-8">
          {steps.map((step, index) => {
            const isCompleted = progress >= (index + 1) * 25;
            const isCurrent = currentStep === index && progress < 100;

            return (
              <div
                key={step.label}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-lg border flex items-center justify-center transition-all duration-300",
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isCurrent
                        ? "bg-zinc-900 border-primary/50 text-primary animate-pulse"
                        : "bg-zinc-950 border-zinc-800 text-zinc-600",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[8px] font-bold uppercase tracking-tighter text-center",
                    isCompleted || isCurrent
                      ? "text-zinc-300"
                      : "text-zinc-600",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backend Insight Card - Requirement 7 */}
      <div className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-zinc-500 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
            Architect's Note
          </p>
          <p className="text-[10px] text-zinc-600 leading-relaxed">
            Long-running tasks are handled via distributed workers. You can
            safely navigate away; the job state is persisted in PostgreSQL and
            results will be available in your History.
          </p>
        </div>
      </div>
    </div>
  );
};
