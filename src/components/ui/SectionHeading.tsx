import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealLines } from "./Reveal";

type Props = {
  /** Chapter number, shown as a hanging serif numeral. */
  index?: string;
  eyebrow: string;
  /** Authored line by line so the break points stay art-directed. */
  lines: ReactNode[];
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  action?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  lines,
  lede,
  tone = "light",
  align = "left",
  action,
  id,
  className,
}: Props) {
  const dark = tone === "dark";

  return (
    <header className={cn("w-full", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-baseline gap-5",
            align === "center" && "justify-center",
          )}
        >
          {index ? (
            <span
              aria-hidden="true"
              className="numeral text-[15px] text-gold"
              style={{ letterSpacing: "0.04em" }}
            >
              {index}
            </span>
          ) : null}
          <span
            className={cn(
              "eyebrow",
              dark ? "text-paper/45" : "text-muted",
            )}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "hidden h-px flex-1 sm:block",
              dark ? "bg-line-dark" : "bg-line",
            )}
          />
        </div>
      </Reveal>

      <RevealLines
        as="h2"
        id={id}
        lines={lines}
        className={cn(
          "display mt-8 text-[clamp(2.4rem,6.2vw,4.6rem)]",
          dark ? "text-paper" : "text-ink",
          align === "center" && "text-center",
        )}
      />

      {lede || action ? (
        <div
          className={cn(
            "mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
            align === "center" && "md:flex-col md:items-center",
          )}
        >
          {lede ? (
            <Reveal delay={220}>
              <p
                className={cn(
                  "lede max-w-xl",
                  dark ? "text-paper/60" : "text-muted",
                  align === "center" && "mx-auto text-center",
                )}
              >
                {lede}
              </p>
            </Reveal>
          ) : (
            <span />
          )}
          {action ? (
            <Reveal delay={300} className="shrink-0">
              {action}
            </Reveal>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
