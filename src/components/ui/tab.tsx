import React, { useState } from "react";
import { cn } from "../../libs/utils";
import { Button } from "./button";

interface TapProps {
  tabHeaders: string[];
  headerRight?: React.ReactNode;
  tabCompents: React.ReactNode[];
  defaultSelectedIndex?: number;
  headersClassName?: string;
  headerWrapperClassName?: string;
  headerItemClassName?: string;
  activeHeaderItemClassName?: string;
}

function Tab({
  tabHeaders,
  headerRight,
  tabCompents,
  defaultSelectedIndex = 0,
  headersClassName,
  headerWrapperClassName,
  headerItemClassName,
  activeHeaderItemClassName,
}: TapProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  return (
    <div className="w-full overflow-auto">
      <div className="scrollbar-hide w-full overflow-x-auto">
        <div
          className={cn(
            "m-0 flex w-full items-center justify-between border-b border-gray-900 px-1 py-0",
            headerWrapperClassName,
          )}
        >
          <div className={cn("flex min-w-max items-center gap-4", headersClassName)}>
            {tabHeaders.map((header, index) => {
              const isActive = selectedIndex === index;
              return (
                <Button
                  key={index}
                  className={cn(
                    `flex cursor-pointer flex-col gap-3 bg-transparent px-1 py-4 hover:bg-transparent`,
                    {
                      "text-primary-500 text-2xl font-medium tracking-wider": isActive,
                      "text-xl font-semibold text-black-coral": !isActive,
                    },
                    headerItemClassName,
                    isActive && activeHeaderItemClassName,
                  )}
                  onClick={() => setSelectedIndex(index)}
                >
                  {header}
                  {/* <ShowActive isActive={isActive} /> */}
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
