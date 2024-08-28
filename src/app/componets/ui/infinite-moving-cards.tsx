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

  // Memoize the addAnimation function
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const [start, setStart] = useState(false);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

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
            className="w-[450px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-[120px] py-9 md:w-[450px]"
            style={{
              backgroundImage: `url(${item.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute top-2 left-0 right-0 text-center text-white font-extrabold text-xl bg-black bg-opacity-60 py-3 px-5 rounded-lg shadow-lg">
              {item.productName}
            </div>

            <blockquote className="relative z-20">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <div className="overflow-y-auto max-h-40">
                <p className="mt-8 text-sm leading-[1.6] text-white font-semibold px-6 py-3 bg-black bg-opacity-70 border-2 border-red-400 rounded-lg">
                  {item.p}
                </p>
              </div>
              {item.productLink && (
                <div>
                  <a
                    href={item.productLink}
                    className="absolute bottom-[-30px] right-[-100px] bg-blue-500 text-white px-3 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600"
                    style={{ zIndex: 10 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Now
                  </a>
                </div>
              )}
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
