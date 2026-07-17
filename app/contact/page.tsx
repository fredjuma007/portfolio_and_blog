"use client"

import type React from "react"
import { PortfolioNav } from "@/components/portfolio/portfolio-nav"
import { PortfolioFooter } from "@/components/portfolio/portfolio-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Send,
  Github,
  ArrowRight,
  Briefcase,
  Code2,
  Coffee,
} from "lucide-react"
import { SiX } from "react-icons/si"
import { useState } from "react"

const CONTACT_REASONS = [
  {
    icon: Briefcase,
    label: "Hire me",
    desc: "Looking for a developer for your team or project",
    color: "text-blue-500",
    bg: "bg-blue-500/8 border-blue-500/20 hover:border-blue-500/40",
  },
  {
    icon: Code2,
    label: "Collaborate",
    desc: "Open source, side projects, or creative builds",
    color: "text-emerald-500",
    bg: "bg-emerald-500/8 border-emerald-500/20 hover:border-emerald-500/40",
  },
  {
    icon: Coffee,
    label: "Just say hi",
    desc: "Networking, ideas, or anything else",
    color: "text-amber-500",
    bg: "bg-amber-500/8 border-amber-500/20 hover:border-amber-500/40",
  },
]

const DIRECT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "fredjuma8@gmail.com",
    href: "mailto:fredjuma8@gmail.com",
    color: "text-blue-500",
    hover: "hover:border-blue-500/40 hover:bg-blue-500/5",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/fredjuma007",
    href: "https://github.com/fredjuma007",
    color: "text-slate-600 dark:text-slate-300",
    hover: "hover:border-slate-400/40 hover:bg-slate-500/5",
  },
  {
    icon: SiX,
    label: "X / Twitter",
    value: "@Fredjuma8Rennox",
    href: "https://x.com/Fredjuma8Rennox",
    color: "text-slate-700 dark:text-slate-200",
    hover: "hover:border-slate-400/40 hover:bg-slate-500/5",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Failed to send message")
      setIsSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSuccess(false), 6000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#080b12]">
      <PortfolioNav />

      <main className="pt-20">
        {/* ── Hero ── */}
        <section className="relative pt-10 pb-6 overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
          {/* ambient glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/4 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6">
              <span className="text-xs text-blue-500 font-mono tracking-wider">get in touch</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 leading-none">
              Let&apos;s Build
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Something.
              </span>
            </h1>
          </div>
        </section>

        {/* ── Main content: Left info + Right form ── */}
        <section className="relative py-16">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* ── Left column ── */}
              <div className="lg:col-span-2 space-y-10">

                {/* Reasons to reach out */}
                <div>
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    Why reach out?
                  </h2>
                  <div className="space-y-3">
                    {CONTACT_REASONS.map(({ icon: Icon, label, desc, color, bg }) => (
                      <div
                        key={label}
                        className={`flex items-start gap-4 p-4 rounded-xl border ${bg} transition-all duration-300`}
                      >
                        <div className={`mt-0.5 ${color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct contact links */}
                <div>
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    Direct links
                  </h2>
                  <div className="space-y-3">
                    {DIRECT_LINKS.map(({ icon: Icon, label, value, href, color, hover }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0d1117]/60 ${hover} transition-all duration-300`}
                      >
                        <Icon className={`w-5 h-5 ${color} shrink-0`} />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{value}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right column: Form ── */}
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0d1117]/60 overflow-hidden shadow-xl dark:shadow-blue-500/5">
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

                  <div className="p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                      <Send className="w-5 h-5 text-blue-500" />
                      Send a message
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                      Fill in the form and I&apos;ll get back to you as soon as possible.
                    </p>

                    {isSuccess && (
                      <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 rounded-xl">
                        <p className="text-emerald-800 dark:text-emerald-400 font-medium text-sm">
                          ✅ Message sent! I&apos;ll get back to you soon.
                        </p>
                      </div>
                    )}
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl">
                        <p className="text-red-800 dark:text-red-400 font-medium text-sm">❌ {error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Fred Juma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="border-slate-200 dark:border-slate-700/60 focus:border-blue-500/60 focus:ring-blue-500/20 bg-slate-50 dark:bg-[#161b22] transition-all duration-200"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="border-slate-200 dark:border-slate-700/60 focus:border-blue-500/60 focus:ring-blue-500/20 bg-slate-50 dark:bg-[#161b22] transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Hiring · Collaboration · Project · Other"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="border-slate-200 dark:border-slate-700/60 focus:border-blue-500/60 focus:ring-blue-500/20 bg-slate-50 dark:bg-[#161b22] transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          placeholder="Tell me about your project, role, or idea..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="border-slate-200 dark:border-slate-700/60 focus:border-blue-500/60 focus:ring-blue-500/20 bg-slate-50 dark:bg-[#161b22] transition-all duration-200 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isLoading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </div>
  )
}
