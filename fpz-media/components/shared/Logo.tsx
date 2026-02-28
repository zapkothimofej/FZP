import { cn } from "@/lib/utils"

interface LogoProps {
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeConfig = {
  sm: { iconSize: 20, fontSize: 14, gap: 8, iconStroke: 2 },
  md: { iconSize: 28, fontSize: 18, gap: 10, iconStroke: 2.5 },
  lg: { iconSize: 40, fontSize: 26, gap: 14, iconStroke: 3 },
}

export function Logo({ color = "#60a5fa", size = "md", className }: LogoProps) {
  const { iconSize, fontSize, gap, iconStroke } = sizeConfig[size]

  return (
    <div
      className={cn("flex items-center", className)}
      style={{ gap: `${gap}px` }}
    >
      {/* Icon: 3 parallel diagonal lines */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Line 1 — top left to bottom right */}
        <line
          x1="3"
          y1="18"
          x2="10"
          y2="6"
          style={{ stroke: color }}
          strokeWidth={iconStroke}
          strokeLinecap="round"
        />
        {/* Line 2 — middle */}
        <line
          x1="9"
          y1="18"
          x2="16"
          y2="6"
          style={{ stroke: color }}
          strokeWidth={iconStroke}
          strokeLinecap="round"
        />
        {/* Line 3 — right */}
        <line
          x1="15"
          y1="18"
          x2="22"
          y2="6"
          style={{ stroke: color }}
          strokeWidth={iconStroke}
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <span
        style={{ fontSize: `${fontSize}px`, lineHeight: 1, letterSpacing: "0.04em" }}
        className="flex items-baseline select-none"
      >
        <span
          style={{ color: "white", fontWeight: 700 }}
        >
          FPZ
        </span>
        <span
          style={{ color: color, fontWeight: 300, marginLeft: "0.25em" }}
        >
          MEDIA
        </span>
      </span>
    </div>
  )
}

export default Logo
