"use client";

import { useState } from "react";

type ProductImageProps = {
  alt: string;
  category?: string;
  className?: string;
  src: string;
};

export function ProductImage({ alt, category = "AnimKart", className = "", src }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center bg-[#e5eeff] p-4 text-center ${className}`}>
        <div className="grid size-12 place-items-center rounded-2xl bg-white text-xl font-black text-[#006b32] shadow-sm">
          A
        </div>
        <p className="mt-3 line-clamp-2 text-xs font-bold text-[#0b1c30]">{alt}</p>
        <p className="mt-1 text-[10px] font-bold uppercase text-[#006b32]">{category}</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={`h-full w-full object-contain p-3 ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
      src={src}
    />
  );
}
