import { cn } from "@/libs/utils.ts";
import { CheckCircle2, Scale, XCircle } from "lucide-react";
import { ProgressStatus } from "../../constants";

export function ProgressStatusIndicator({
  dashCount = 6,
  status = ProgressStatus.PENDING,
  gap = 0.25,
}: {
  dashCount?: number;
  status?: ProgressStatus;
  gap?: number;
}) {
  gap = status === ProgressStatus.COMPLETED ? 0 : gap;
  return (
    <div className="flex h-full items-center">
      <div className="relative flex h-full flex-col" style={{ gap: `${gap}rem` }}>
        {Array.from({ length: dashCount }).map((_, index) => (
          <div
            key={index}
            className={cn("w-[2px] flex-1 bg-gray-600", {
              "h-full": status != ProgressStatus.COMPLETED,
              "bg-gray-400": status === ProgressStatus.IN_PROGRESS,
              "bg-green-500": status === ProgressStatus.COMPLETED,
              "bg-red-500": status === ProgressStatus.DANGER,
              "bg-yellow-500": status === ProgressStatus.APPEALED,
            })}
          />
        ))}
      </div>
      {status == ProgressStatus.PENDING && (
        <div className="absolute -left-[3px] h-[6px] w-[6px] animate-pulse rounded-full border-2 bg-onyx outline outline-offset-2" />
      )}

      {status === ProgressStatus.COMPLETED && (
        <CheckCircle2 className="absolute -left-[6.5px] h-[15px] w-[15px] rounded-full bg-onyx text-green-400" />
      )}

      {status === ProgressStatus.DANGER && (
        <XCircle className="absolute -left-[6.5px] h-[15px] w-[15px] rounded-full bg-onyx text-red-400" />
      )}

      {status === ProgressStatus.APPEALED && (
        <Scale className="absolute -left-[6.5px] h-[15px] w-[15px] rounded-full bg-onyx text-yellow-400" />
      )}
    </div>
  );
}
