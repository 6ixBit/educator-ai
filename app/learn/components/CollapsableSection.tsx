import React, { useState } from "react";
import HorizontalSeparator from "@/components/HorizontalSeparator/HorizontalSeparator";

const CollapsableSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between items-baseline text-white space-x-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-white mt-12 mb-6 text-left font-bold text-2xl leading-relaxed font-sans  sm:px-37">
          {title}
        </h1>

        <span>{isOpen ? "👆" : "👇"}</span>
      </div>
      {!isOpen && <HorizontalSeparator />}
      {isOpen ? (
        <div>{children}</div>
      ) : (
        <div className="opacity-50 overflow-hidden h-5 text-white">
          {children}
        </div>
      )}
    </div>
  );
};
export default CollapsableSection;
