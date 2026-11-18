/**
 * Adapted from 21st.dev — "Text Reveal (Mask)" by soralabs.
 * Changes: <em>/<i> emphasis renders as serif italic in champagne-ink, `play` prop to gate the
 * animation (e.g. after the preloader), LUMIÈRE easing, lines + words modes only.
 */
"use client";

import { cn } from "@/lib/utils";
import { motion, type UseInViewOptions, useInView, useReducedMotion } from "motion/react";
import {
  type ElementType,
  isValidElement,
  type ReactNode,
  type RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SplitBy = "lines" | "words";
const DEFAULTS: Record<SplitBy, { duration: number; stagger: number }> = {
  lines: { duration: 1.1, stagger: 0.08 },
  words: { duration: 0.9, stagger: 0.04 },
};
const EASE = [0.22, 1, 0.36, 1] as const;
const WS = /\s+/;

interface WordToken {
  emphasized: boolean;
  text: string;
}

function collectWords(node: ReactNode, emphasized = false): WordToken[] {
  if (typeof node === "string") {
    return node.split(WS).filter(Boolean).map((text) => ({ text, emphasized }));
  }
  if (Array.isArray(node)) return node.flatMap((c) => collectWords(c, emphasized));
  if (isValidElement(node)) {
    const next = emphasized || node.type === "em" || node.type === "i";
    return collectWords((node.props as { children?: ReactNode }).children, next);
  }
  return [];
}

function groupWordsByLine(measure: HTMLDivElement): number[][] {
  const nodes = measure.querySelectorAll("[data-measure-word]");
  if (!nodes.length) return [[0]];
  const groups: number[][] = [];
  let cur: number[] = [];
  let lastTop = -1;
  nodes.forEach((n, i) => {
    const top = (n as HTMLElement).offsetTop;
    if (lastTop !== -1 && top > lastTop + 1) {
      groups.push(cur);
      cur = [];
    }
    cur.push(i);
    lastTop = top;
  });
  if (cur.length) groups.push(cur);
  return groups;
}

function Word({ word, last }: { word: WordToken; last: boolean }) {
  return (
    <span
      className={cn(
        "inline-block [backface-visibility:hidden]",
        !last && "me-[0.25em]",
        word.emphasized && "font-serif italic text-champagne-ink",
      )}
    >
      {word.text}
    </span>
  );
}

function useLineGroups(words: WordToken[], className: string | undefined, rootRef: RefObject<HTMLDivElement | null>) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [groups, setGroups] = useState<number[][] | null>(null);
  const key = `${className}:${words.map((w) => `${+w.emphasized}${w.text}`).join("\u0000")}`;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const m = measureRef.current;
    if (!root || !m) return;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      const w = root.clientWidth || root.parentElement?.clientWidth || 0;
      if (w) m.style.width = `${w}px`;
      setGroups(groupWordsByLine(m));
    };
    run();
    document.fonts.ready.then(run);
    const ro = new ResizeObserver(run);
    ro.observe(root);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const layer = (
    <div
      aria-hidden
      ref={measureRef}
      className={cn("pointer-events-none invisible fixed top-0 left-[-9999px] block", className)}
    >
      {words.map((w, i) => (
        <span data-measure-word key={i}>
          <Word word={w} last={i === words.length - 1} />
        </span>
      ))}
    </div>
  );
  return { groups, layer };
}

export interface MaskedTextRevealProps {
  as?: keyof React.JSX.IntrinsicElements;
  children?: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: SplitBy;
  once?: boolean;
  /** When defined, overrides in-view triggering. */
  play?: boolean;
  viewportMargin?: UseInViewOptions["margin"];
  yPercent?: number;
}

export function MaskedTextReveal({
  as: Tag = "p",
  children,
  className,
  delay = 0,
  duration,
  stagger,
  splitBy = "lines",
  once = true,
  play,
  viewportMargin = "0px 0px -20% 0px",
  yPercent = 110,
}: MaskedTextRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(rootRef, { once, margin: viewportMargin });
  const words = useMemo(() => collectWords(children), [children]);
  const label = useMemo(() => words.map((w) => w.text).join(" "), [words]);
  const { groups, layer } = useLineGroups(words, className, rootRef);
  const d = duration ?? DEFAULTS[splitBy].duration;
  const s = stagger ?? DEFAULTS[splitBy].stagger;
  const C = Tag as ElementType;

  if (reduce) {
    return (
      <div ref={rootRef} className="w-full">
        <C className={className}>{children}</C>
      </div>
    );
  }

  const ready = !!groups?.length;
  const animate = ready && (play ?? inView);
  let wordOrder = 0;

  return (
    <div ref={rootRef} className="relative w-full">
      {layer}
      <C aria-label={label} className={cn("block", !ready && "invisible", className)}>
        {ready &&
          groups!.map((g, li) => (
            <span key={li} aria-hidden className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              {splitBy === "lines" ? (
                <motion.span
                  className="block will-change-transform"
                  initial={{ y: `${yPercent}%` }}
                  animate={{ y: animate ? "0%" : `${yPercent}%` }}
                  transition={{ duration: d, delay: delay + li * s, ease: EASE }}
                >
                  {g.map((wi) => (
                    <Word key={wi} word={words[wi]} last={wi === words.length - 1} />
                  ))}
                </motion.span>
              ) : (
                g.map((wi) => {
                  const order = wordOrder++;
                  return (
                    <motion.span
                      key={wi}
                      className="inline-block will-change-transform"
                      initial={{ y: `${yPercent}%` }}
                      animate={{ y: animate ? "0%" : `${yPercent}%` }}
                      transition={{ duration: d, delay: delay + order * s, ease: EASE }}
                    >
                      <Word word={words[wi]} last={wi === words.length - 1} />
                    </motion.span>
                  );
                })
              )}
            </span>
          ))}
      </C>
    </div>
  );
}

export default MaskedTextReveal;
