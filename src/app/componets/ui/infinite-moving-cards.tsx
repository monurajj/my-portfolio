"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn"; // Assuming this is your utility for classNames

interface Props {
  items: {
    productName: string;
    p: string;
    backgroundImage: string;
    productLink?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<Props> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]); // Include getDirection and getSpeed as dependencies

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
          key={idx}
          className="relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-700 shadow-lg bg-white text-gray-900 w-[450px] h-[360px] md:w-[450px] md:h-[360px]"
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
          {/* Product Name */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold bg-gradient-to-r from-black to-transparent bg-opacity-70 py-2 px-6 rounded-md shadow-md">
            {item.productName}
          </div>
        
          {/* Product Description */}
          <div className="relative z-10 h-full flex flex-col justify-between items-center p-6">
            {/* Centered Description */}
            <div className="flex-grow flex items-center justify-center">
              <p className="text-sm text-center leading-relaxed text-white bg-black bg-opacity-70 p-4 rounded-lg shadow-md max-w-[80%]">
                {item.p}
              </p>
            </div>
        
            {/* Explore More Button */}
            {item.productLink && (
              <div className="absolute bottom-4 right-4">
                <a
                  href={item.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium py-2 px-4 rounded-md shadow-md transition-transform hover:scale-105 hover:from-blue-600 hover:to-indigo-600"
                >
                  Explore More
                </a>
              </div>
            )}
          </div>
        </li>
        
        
        ))}
      </ul>
    </div>
  );
};
