"use client"

import React from "react"

/**
 * Pure-CSS chrome sphere — no WebGL, ultra-performant.
 * Uses a radial-gradient to simulate the chrome reflective look.
 */
export interface CSSphereProps {
  size?: number
  opacity?: number
  glow?: boolean
  className?: string
  style?: React.CSSProperties
  animate?: "float" | "pulse" | "spin" | "none"
}

export function CSSphere({
  size = 100,
  opacity = 1,
  glow = false,
  className,
  style,
  animate = "none",
}: CSSphereProps) {
  const glowRadius = Math.round(size * 0.5)
  const glowFar = Math.round(size * 1.0)
  const insetShadow = Math.round(size * 0.08)
  const insetBlur = Math.round(size * 0.22)

  const animationName =
    animate === "float"
      ? "cssphere-float"
      : animate === "pulse"
      ? "cssphere-pulse"
      : animate === "spin"
      ? "cssphere-spin"
      : undefined

  return (
    <>
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          flexShrink: 0,
          background: [
            "radial-gradient(circle at 32% 32%,",
            "  rgba(255,255,255,0.95) 0%,",
            "  rgba(230,230,230,0.85) 12%,",
            "  rgba(180,180,180,0.7) 28%,",
            "  rgba(110,110,110,0.55) 50%,",
            "  rgba(50,50,50,0.35) 72%,",
            "  rgba(10,10,10,0.15) 100%)",
          ].join(""),
          boxShadow: [
            `inset -${insetShadow}px -${insetShadow}px ${insetBlur}px rgba(0,0,0,0.45)`,
            `inset ${Math.round(insetShadow * 0.4)}px ${Math.round(insetShadow * 0.4)}px ${Math.round(insetBlur * 0.6)}px rgba(255,255,255,0.2)`,
            glow
              ? `, 0 0 ${glowRadius}px rgba(200,200,200,0.25), 0 0 ${glowFar}px rgba(200,200,200,0.08)`
              : "",
          ].join(""),
          opacity,
          animation: animationName
            ? `${animationName} var(--cssphere-dur, 6s) ease-in-out var(--cssphere-delay, 0s) infinite`
            : undefined,
          ...style,
        }}
      />
      {animate !== "none" && (
        <style>{`
          @keyframes cssphere-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50%       { transform: translateY(-18px) scale(1.04); }
          }
          @keyframes cssphere-pulse {
            0%, 100% { transform: scale(1);    opacity: var(--cssphere-opacity, 1); }
            50%       { transform: scale(1.08); opacity: calc(var(--cssphere-opacity, 1) * 0.7); }
          }
          @keyframes cssphere-spin {
            0%   { transform: rotate(0deg) translateX(4px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(4px) rotate(-360deg); }
          }
        `}</style>
      )}
    </>
  )
}

export default CSSphere
