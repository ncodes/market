import React, { useState } from "react";
import { cn } from "../../libs/utils";
import { Button } from "./button";

interface TapProps {
  tabHeaders: string[] | React.ReactNode[];
  headerRight?: React.ReactNode;
  tabCompents: React.ReactNode[];
  defaultSelectedIndex?: number;
  headersClassName?: string;
  headerWrapperClassName?: string;
}

function Tab({
  tabHeaders,
  headerRight,
  tabCompents,
  defaultSelectedIndex = 0,
  headersClassName,
  headerWrapperClassName,
}: TapProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  return (
    <div className="w-full">
      <div className="scrollbar-hide w-full overflow-x-auto">
        <div
          className={cn(
            "m-0 flex w-full items-center justify-between border-b border-gray-900 px-4 py-0",
            headerWrapperClassName,
          )}
        >
          <div className={cn("flex min-w-max items-center gap-4", headersClassName)}>
            {tabHeaders.map((header, index) => {
              const isActive = selectedIndex === index;
              return typeof header === "string" ? (
                <div
                  key={index}
                  className={`flex cursor-pointer flex-col gap-3 px-1`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <p
                    className={cn("py-4", {
                      "text-primary-500 text-2xl font-medium tracking-wider": isActive,
                      "text-black-coral text-xl font-semibold": !isActive,
                    })}
                  >
                    {header}
                  </p>
                  {/* <ShowActive isActive={isActive} /> */}
                </div>
              ) : (
                <Button variant={"ghost"} className="hover:bg-transparent" onClick={() => setSelectedIndex(index)}>
                  {header}
                </Button>
              );
            })}
          </div>
          {headerRight}
        </div>
      </div>
      <div className="w-full">{tabCompents[selectedIndex]}</div>
    </div>
  );
}

export default Tab;
