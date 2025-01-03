import { CheckCircle, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "../../../components/ui/button";

const defaultState: {} = {};

export function DrawerSuccessfulMarketCreation({
  drawerRef,
  drawerMeta,
  containerHeight,
  closeRequested,
}: {
  drawerRef: React.RefObject<HTMLDivElement>;
  drawerMeta: {
    marketId: string;
  };
  containerHeight?: number;
  closeRequested?: () => void;
}) {
  const [state, setState] = useState({ ...defaultState });

  useOnClickOutside(drawerRef, () => {
    closeRequested?.();
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
  }, []);

  return (
    <div className="max-w-[650px] rounded-3xl bg-gray-200/10 py-2 pb-0 backdrop-blur-2xl">
      <span className="absolute right-3 top-5">
        <Button
          variant="link"
          className="h-auto p-0"
          onClick={() => {
            closeRequested?.();
          }}
        >
          <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
        </Button>
      </span>

      <div
        className="flex w-full flex-col items-center justify-center gap-2 overflow-auto"
        style={{ height: containerHeight! + "px" }}
      >
        <span className="flex">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </span>
        <span className="">Your market was created successfully</span>
        <span>
          <Link to={`/m/${drawerMeta.marketId}`} className="text-light-green/90 hover:text-light-green">
            View Market
          </Link>
        </span>
      </div>
    </div>
  );
}
