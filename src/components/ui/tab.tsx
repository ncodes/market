import React, { useState } from "react";

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
        <div className="m-0 flex w-full items-center justify-between border-b border-gray-800 px-4 py-0">
          <div className="flex min-w-max gap-4">
            {tabHeaders.map((header, index) => {
              const isActive = selectedIndex === index;
              return (
                <div
                  key={index}
                  className={`flex cursor-pointer flex-col gap-4 px-1`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <p
                    className={`pt-4 ${isActive ? "text-primary-500 text-xl font-bold" : "text-lg font-semibold text-gray-600"}`}
                  >
                    {header}
                  </p>
                  <div
                    className={`h-1 w-full rounded-se-[3px] rounded-ss-[3px] ${isActive ? "bg-light-green" : "bg-transparent"}`}
                  ></div>
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
