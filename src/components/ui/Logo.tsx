import { cn } from "@/lib/utils";

type Props = {
  /** Wordmark colour. The tooth mark always keeps the brand rose. */
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

/**
 * STATUS wordmark, redrawn as inline SVG so it stays crisp at any size and
 * recolours for light and dark surfaces.
 */
export function Logo({ tone = "dark", className, compact = false }: Props) {
  const text = tone === "dark" ? "text-ink" : "text-white";

  return (
    <span className={cn("flex items-center gap-2.5", text, className)}>
      <svg
        viewBox="0 0 32 40"
        className={cn("shrink-0", compact ? "h-7 w-auto" : "h-8 w-auto")}
        aria-hidden="true"
      >
        <path
          d="M16 1C10.2 1 3 3.4 3 10.6c0 4.6 1.6 8.8 2.8 14 1.1 4.8 1.4 14.8 3.8 14.8 2.3 0 2.8-8 3.8-12.6.5-2.3 1.5-3.1 2.6-3.1s2.1.8 2.6 3.1c1 4.6 1.5 12.6 3.8 12.6 2.4 0 2.7-10 3.8-14.8 1.2-5.2 2.8-9.4 2.8-14C29 3.4 21.8 1 16 1Z"
          fill="#e8629b"
        />
        <circle cx="10.4" cy="13.4" r="1.7" fill="#b93c72" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-extrabold tracking-[0.2em]",
            compact ? "text-[15px]" : "text-[17px]",
          )}
        >
          STATUS
        </span>
        <span
          className={cn(
            "mt-1 font-semibold uppercase tracking-[0.22em] opacity-55",
            compact ? "text-[7px]" : "text-[8px]",
          )}
        >
          Dental Center
        </span>
      </span>
    </span>
  );
}
