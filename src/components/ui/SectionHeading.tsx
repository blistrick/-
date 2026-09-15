import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Renders for dark sections. */
  tone?: "dark" | "light";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  action,
  className,
}: Props) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "md:text-center")}>
        <Reveal>
          <p
            className={cn(
              "eyebrow flex items-center gap-2.5",
              align === "center" && "md:justify-center",
              dark ? "text-white/45" : "text-muted",
            )}
          >
            <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2
            className={cn(
              "display mt-5 text-[clamp(2rem,5.4vw,3.5rem)]",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
        </Reveal>

        {description ? (
          <Reveal delay={120}>
            <div
              className={cn(
                "mt-6 text-[16px] leading-relaxed md:text-[17px]",
                dark ? "text-white/60" : "text-muted",
              )}
            >
              {description}
            </div>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal delay={160} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
