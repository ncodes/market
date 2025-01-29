import React, { useState } from "react";
import { cn } from "../../libs/utils";
import ShowActive from "../ShowActive";

interface TapProps {
  tabHeaders: string[];
  headerRight?: React.ReactNode;
  tabCompents: React.ReactNode[];
  defaultSelectedIndex?: number;
}

function Tab({ tabHeaders, headerRight, tabCompents, defaultSelectedIndex = 0 }: TapProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  return (
    <div className="w-full pb-10">
      <div className="scrollbar-hide w-full overflow-x-auto">
        <div className="m-0 flex w-full items-center justify-between border-b border-gray-900 px-4 py-0">
          <div className="flex min-w-max items-center gap-4">
            {tabHeaders.map((header, index) => {
              const isActive = selectedIndex === index;
              return (
                <div
                  key={index}
                  className={`flex cursor-pointer flex-col gap-3 px-1`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <p
                    className={cn("pt-4", {
                      "text-primary-500 text-2xl font-bold": isActive,
                      "text-xl font-semibold text-gray-600": !isActive,
                    })}
                  >
                    {header}
                  </p>
                  <ShowActive isActive={isActive} />
                </div>
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
