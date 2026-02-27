"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
} | null>(null)

const STORAGE_KEY = "fpz-v6-theme"

export function useV6Theme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useV6Theme must be used within V6ThemeProvider")
  return ctx
}

export function V6ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === "light" || stored === "dark") setThemeState(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, mounted])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div
        data-theme={mounted ? theme : "dark"}
        className="min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: "var(--v6-bg)",
          color: "var(--v6-text)",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
