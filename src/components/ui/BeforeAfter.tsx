"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  alt: string;
  /** Source frames already carry printed "ДО" / "ПОСЛЕ" captions. */
  bakedLabels?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Draggable before/after comparison.
 * Pointer, touch and keyboard driven; exposed to assistive tech as a slider.
 */
export function BeforeAfter({
  slug,
  alt,
  bakedLabels = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
}: Props) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const moveTo = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    // A mouse click jumps straight to the clicked point. A touch must not:
    // people tap the card on the way to scrolling the page.
    if (event.pointerType === "mouse") moveTo(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    moveTo(event.clientX);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={frameRef}
      role="slider"
      tabIndex={0}
      aria-label={`Сравнение до и после: ${alt}`}
      aria-labelledby={labelId}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`Показано ${Math.round(position)}% состояния до лечения`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onKeyDown={onKeyDown}
      className={cn(
        "group/ba relative select-none overflow-hidden bg-ink-soft touch-pan-y",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      <span id={labelId} className="sr-only">
        {alt}. Перетащите ползунок, чтобы сравнить результат.
      </span>

      {/* After — the base layer */}
      <Image
        src={`/images/cases/${slug}-after.webp`}
        alt={`${alt} — после лечения`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        draggable={false}
      />

      {/* Before — clipped from the right edge */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={`/images/cases/${slug}-before.webp`}
          alt={`${alt} — до лечения`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          draggable={false}
        />
      </div>

      {!bakedLabels ? (
        <>
          <span
            className="pointer-events-none absolute left-4 top-4 bg-ink/75 px-3.5 py-1.5 text-[9.5px] font-medium uppercase tracking-[0.26em] text-paper/90 backdrop-blur-sm transition-opacity duration-500"
            style={{ opacity: position > 14 ? 1 : 0 }}
          >
            До
          </span>
          <span
            className="pointer-events-none absolute right-4 top-4 bg-gold/90 px-3.5 py-1.5 text-[9.5px] font-medium uppercase tracking-[0.26em] text-paper backdrop-blur-sm transition-opacity duration-500"
            style={{ opacity: position < 86 ? 1 : 0 }}
          >
            После
          </span>
        </>
      ) : null}

      {/* Handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-paper/90 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%` }}
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper shadow-lg transition-transform duration-300",
            dragging ? "scale-110" : "group-hover/ba:scale-105",
          )}
        >
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            aria-hidden="true"
            className="text-ink"
          >
            <path
              d="M6.5 1 1.5 6l5 5M13.5 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
