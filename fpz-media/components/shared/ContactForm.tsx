"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  accentColor: string
  className?: string
}

type FormState = "idle" | "loading" | "success" | "error"

export function ContactForm({ accentColor, className }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [service, setService] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("loading")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
      service,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.")
        setFormState("error")
        return
      }

      setFormState("success")
    } catch {
      setErrorMessage("Network error. Please try again.")
      setFormState("error")
    }
  }

  if (formState === "success") {
    return (
      <div className={cn("flex flex-col items-center justify-center py-16 text-center gap-4", className)}>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
          style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}` }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-white text-xl font-semibold">Message sent!</h3>
        <p className="text-white/60 text-sm max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-4 text-sm underline underline-offset-4"
          style={{ color: accentColor }}
        >
          Send another message
        </button>
      </div>
    )
  }

  const isLoading = formState === "loading"

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-white/80 text-sm">
            Name <span style={{ color: accentColor }}>*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            disabled={isLoading}
            placeholder="Max Mustermann"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-transparent"
            style={
              {
                "--tw-ring-color": `${accentColor}50`,
              } as React.CSSProperties
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-white/80 text-sm">
            E-Mail <span style={{ color: accentColor }}>*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={isLoading}
            placeholder="max@beispiel.de"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-transparent"
            style={
              {
                "--tw-ring-color": `${accentColor}50`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {/* Row: Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-white/80 text-sm">
            Phone <span className="text-white/40 font-normal">(optional)</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            disabled={isLoading}
            placeholder="+49 123 456789"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="company" className="text-white/80 text-sm">
            Company <span className="text-white/40 font-normal">(optional)</span>
          </Label>
          <Input
            id="company"
            name="company"
            type="text"
            disabled={isLoading}
            placeholder="Musterfirma GmbH"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-transparent"
          />
        </div>
      </div>

      {/* Service Select */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="service" className="text-white/80 text-sm">
          Service
        </Label>
        <Select value={service} onValueChange={setService} disabled={isLoading}>
          <SelectTrigger
            id="service"
            className="w-full bg-white/5 border-white/10 text-white data-[placeholder]:text-white/30 focus-visible:border-transparent"
          >
            <SelectValue placeholder="What can we help you with?" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900 border-white/10 text-white">
            <SelectItem value="Web Development" className="focus:bg-white/10 focus:text-white">
              Web Development
            </SelectItem>
            <SelectItem value="Media Production" className="focus:bg-white/10 focus:text-white">
              Media Production
            </SelectItem>
            <SelectItem value="Automation" className="focus:bg-white/10 focus:text-white">
              Automation
            </SelectItem>
            <SelectItem value="Everything" className="focus:bg-white/10 focus:text-white">
              Everything
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-white/80 text-sm">
          Message <span style={{ color: accentColor }}>*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          disabled={isLoading}
          rows={5}
          placeholder="Tell us about your project..."
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-transparent resize-none"
          style={
            {
              "--tw-ring-color": `${accentColor}50`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Error message */}
      {formState === "error" && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="relative mt-1 h-11 px-8 rounded-md text-sm font-semibold text-black transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: accentColor }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  )
}

export default ContactForm
