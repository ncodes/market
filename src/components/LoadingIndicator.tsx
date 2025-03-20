import { RotatingLines } from "react-loader-spinner";

function LoadingIndicator({ strokeWidth = "2", width = "30" }) {
  return (
    <div className="flex w-full items-center justify-center">
      <RotatingLines strokeColor={"#8de969"} strokeWidth={strokeWidth} width={width} />
    </div>
  );
}

export default LoadingIndicator;
