import React from "react";

interface StudioLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * StudioLayout wraps content with the Prize2Pride casino-style studio background.
 * Use this component to give any page the luxurious game show studio aesthetic.
 */
export default function StudioLayout({ children, className = "" }: StudioLayoutProps) {
  return (
    <div className={`studio-bg min-h-screen ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
