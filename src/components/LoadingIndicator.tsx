import { cn } from "@/libs/utils";
import { RotatingLines } from "react-loader-spinner";

function LoadingIndicator({ strokeWidth = "2", width = "30", className = "" }) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <RotatingLines strokeColor={"#8de969"} strokeWidth={strokeWidth} width={width} />
    </div>
  );
}

export default LoadingIndicator;
