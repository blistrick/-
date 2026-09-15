"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "fade" | "image" | "line";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. Keep groups to roughly eight items. */
  delay?: number;
  variant?: Variant;
  className?: string;
  as?: ElementType;
};

const variantClass: Record<Variant, string> = {
  fade: "reveal",
  image: "reveal-image",
  line: "reveal-line",
};

/**
 * Plays one entrance animation the first time an element scrolls into view,
 * then disconnects. `line` expects a single <span> child so the text can rise
 * out of its own mask.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
  as,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(variantClass[variant], className)}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {variant === "image" ? (
        <span className="reveal-image-mask">{children}</span>
      ) : (
        children
      )}
    </Tag>
  );
}

/**
 * Splits a heading into masked lines that rise in sequence.
 * Lines are authored explicitly so the break points stay art-directed.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  step = 110,
  as: Tag = "span",
  ...rest
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  step?: number;
  as?: ElementType;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  const Wrapper = Tag as ElementType;
  return (
    <Wrapper className={className} {...rest}>
      {lines.map((line, index) => (
        <Reveal
          key={index}
          as="span"
          variant="line"
          delay={index * step}
          className={lineClassName}
        >
          <span>{line}</span>
        </Reveal>
      ))}
    </Wrapper>
  );
}
