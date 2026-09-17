"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Renders the 3D hero centerpiece when the browser supports WebGL and the
 * viewer hasn't asked for reduced motion; otherwise falls back to the real
 * clinic photo so the hero never ships broken or motion-heavy for someone
 * who opted out.
 */
export default function Hero3D() {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);

  useEffect(() => {
    // WebGL/reduced-motion support can only be detected client-side, and it
    // must live in state to gate which branch renders (Canvas vs. photo
    // fallback) — there's no way to compute this during the render body
    // itself since `window`/`canvas.getContext` don't exist during SSR.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanRender3D(!reducedMotion && supportsWebGL());
  }, []);

  if (canRender3D === false) {
    return (
      <div className="relative h-full w-full">
        <Image
          src="/images/clinic/treatment-chair.jpeg"
          alt="Приём в клинике STATUS Dental Center"
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full" aria-hidden="true">
      {canRender3D && <HeroScene />}
    </div>
  );
}
