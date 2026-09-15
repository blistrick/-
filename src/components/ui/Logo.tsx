import { cn } from "@/lib/utils";

type Props = {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

/**
 * STATUS wordmark. The brand rose lives here and nowhere else on the page,
 * so it reads as a signature instead of a theme colour.
 */
export function Logo({ tone = "dark", className, compact = false }: Props) {
  const text = tone === "dark" ? "text-ink" : "text-paper";

  return (
    <span className={cn("flex items-center gap-3", text, className)}>
      <svg
        viewBox="0 0 32 40"
        className={cn("shrink-0", compact ? "h-6 w-auto" : "h-7 w-auto")}
        aria-hidden="true"
      >
        <path
          d="M16 1C10.2 1 3 3.4 3 10.6c0 4.6 1.6 8.8 2.8 14 1.1 4.8 1.4 14.8 3.8 14.8 2.3 0 2.8-8 3.8-12.6.5-2.3 1.5-3.1 2.6-3.1s2.1.8 2.6 3.1c1 4.6 1.5 12.6 3.8 12.6 2.4 0 2.7-10 3.8-14.8 1.2-5.2 2.8-9.4 2.8-14C29 3.4 21.8 1 16 1Z"
          fill="#e8629b"
        />
        <circle cx="10.4" cy="13.4" r="1.7" fill="#c2497c" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans font-semibold",
            compact ? "text-[13px]" : "text-[15px]",
          )}
          style={{ letterSpacing: "0.26em" }}
        >
          STATUS
        </span>
        <span
          className={cn(
            "mt-1.5 font-sans font-light uppercase opacity-55",
            compact ? "text-[7px]" : "text-[7.5px]",
          )}
          style={{ letterSpacing: "0.34em" }}
        >
          Dental Center
        </span>
      </span>
    </span>
  );
}
