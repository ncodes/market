import { Button } from "@/components/ui/button.tsx";
import { getLogoUrl, getShortName } from "@jointlabs/meta";
import { XIcon } from "lucide-react";
import { Fragment } from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { ToolTip } from "../../../components/toolTip";
import { toAbr } from "../../../libs/helpers";
import { calculateRoutesFee } from "../utils";

export function SwapDrawerRouterSelector({
  closeRequested,
  containerHeight,
  onSelected,
  routesList,
}: {
  containerHeight?: number;
  closeRequested?: () => void;
  onSelected?: (routes: PayRouterRoute[]) => void;
  routesList: PayRouterRoute[][];
}) {
  return (
    <div className="relative m-0 max-w-[650px] rounded-3xl py-4 pb-0">
      <div>
        <h2 className="mb-4 flex items-center justify-between px-4 font-medium tracking-wider text-white">
          <span>Select a router</span>
          <span>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </h2>
      </div>

      <div className="min-h-[120px] w-full overflow-auto" style={{ maxHeight: containerHeight! * 0.6 + "px" }}>
        <div className="flex flex-col space-y-2 px-2 pb-2">
          <RoutesList
            routesList={routesList}
            onSelected={(routes: PayRouterRoute[]) => {
              closeRequested?.();
              setTimeout(() => {
                onSelected?.(routes);
              }, 300);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function RoutesList({
  routesList,
  onSelected,
}: {
  routesList: PayRouterRoute[][];
  onSelected?: (routes: PayRouterRoute[]) => void;
}) {
  return (
    <>
      {routesList.map((routes, index) => (
        <Button
          key={index}
          variant="ghost"
          size="full"
          className="m-0 h-auto justify-start rounded-2xl border-boulder/20 p-2 text-left transition-all duration-300 hover:scale-[1.01] hover:border-transparent hover:bg-baltic-sea/50 hover:text-white"
          onClick={() => onSelected?.(routes)}
        >
          <RoutesPathView routes={routes} />
        </Button>
      ))}
    </>
  );
}

function Route({ name, fee, feePrefix }: { name: string; fee: number; feePrefix: string }) {
  let nameAbr = (name.length > 9 ? getShortName(name) : name) || "";
  nameAbr = nameAbr.length > 9 ? toAbr(nameAbr) : nameAbr;

  return (
    <div className="flex items-center gap-2">
      <ToolTip tip={name} className="flex flex-col gap-1">
        <span className="flex items-center text-gray-900">
          <Avatar
            src={getLogoUrl(name) || ""}
            fallback={name.charAt(0)}
            className="aspect-auto rounded"
            fallbackClassName="rounded bg-blue-200"
            rootClassName="h-7 w-7 !rounded-none"
          />
        </span>
        <span className="flex w-[50px] gap-1 text-xs font-light text-white">
          <span>{nameAbr}</span>
          <span className="text-xs text-boulder">
            {feePrefix}
            {fee}%
          </span>
        </span>
      </ToolTip>
    </div>
  );
}

export function RoutesPathView({ routes }: { routes: PayRouterRoute[] }) {
  return (
    <div className="flex items-center tracking-wider">
      {routes.map((path, index) => (
        <Fragment key={index}>
          <Route name={path.sourceOrg.name} fee={path.fee} feePrefix="+" />
          <Ellipsis count={3} />
        </Fragment>
      ))}
      <Route name={routes[routes.length - 1].destOrg.name} fee={calculateRoutesFee(routes)} feePrefix="=" />
    </div>
  );
}

function Ellipsis({ count }: { count: number }) {
  return (
    <div className="relative -top-3 flex h-1 items-center justify-start gap-1 px-5">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-gray-500" />
      ))}
    </div>
  );
}
