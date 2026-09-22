"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from "lucide-react"
import { SiX, SiWhatsapp } from "react-icons/si"

//  Constants 

const WHATSAPP_NUMBER = "254710730243"

const getWhatsAppUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

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
    icon: SiWhatsapp,
    label: "WhatsApp",
    value: "+254 710 730 243",
    href: getWhatsAppUrl("Hi Fred! I came across your portfolio and would like to connect."),
    color: "text-emerald-500",
    hover: "hover:border-emerald-500/40 hover:bg-emerald-500/5",
  },
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

const SERVICE_PACKAGES = [
  {
    id: "frontend-polish",
    title: "Startup Starter Pack and Blog",
    badge: "Speed & UI",
    price: "KES 30,000",
    period: "starting rate",
    turnaround: "1–2 weeks",
    description: "Build a professional and modern web application for startup or business website and a blog  " ,
    features: [
      "Responsive UI redesign (Dark/Light mode)",
      "Tailwind CSS & micro-animations",
      "SanityCMS Integration ",
      "Mobile-first polish & cross-browser testing",
      "Reusable, type-safe React component library",
      "Inclusive of hosting & domain for 1 year",
      "30 days post-launch support & bug fixing",
    ],
    popular: false,
    gradient: "from-cyan-500/10 to-blue-500/10",
    border: "border-slate-200 dark:border-slate-800 hover:border-cyan-500/40",
    btnColor: "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700",
  },
  {
    id: "fullstack-mvp",
    title: "Full-Stack Web MVP",
    badge: "Most Popular",
    price: "KES 95,000",
    period: "starting rate",
    turnaround: "2–4 weeks",
    description: "Complete, production-ready web application from architectural concept to live deployment.",
    features: [
      "Next.js App Router & TypeScript architecture",
      "Relational Database (PostgreSQL / MySQL / Supabase)",
      "Authentication & secure session management",
      "Custom domain, SSL & Cloudflare/Vercel setup",
      "SEO metadata & social sharing cards",
      "60 days post-launch support & bug fixing",
    ],
    popular: true,
    gradient: "from-blue-600/15 via-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/40 dark:border-blue-500/40 hover:border-blue-500 shadow-lg shadow-blue-500/5",
    btnColor: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-500/25",
  },
  {
    id: "android-app",
    title: "Native Android App",
    badge: "Mobile Native",
    price: "KES 130,000",
    period: "starting rate",
    turnaround: "3–5 weeks",
    description: "Fast, native Android application engineered with Kotlin, modern Jetpack Compose, and offline capabilities.",
    features: [
      "Modern Kotlin & Jetpack Compose UI",
      "REST API integration & background sync",
      "Offline-first caching & Room database",
      "Material 3 design & dark mode support",
      "Play Store deployment readiness & release bundles",
      "90 days post-launch technical support",
    ],
    popular: false,
    gradient: "from-purple-500/10 to-blue-500/10",
    border: "border-slate-200 dark:border-slate-800 hover:border-purple-500/40",
    btnColor: "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700",
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

function ContactContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState<"message" | "services">(
    tabParam === "services" ? "services" : "message"
  )

  useEffect(() => {
    if (tabParam === "services") {
      setActiveTab("services")
    } else if (tabParam === "message") {
      setActiveTab("message")
    }
  }, [tabParam])

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

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
      setSelectedPackage(null)
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

  const handleSelectPackage = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle)
    setFormData((prev) => ({
      ...prev,
      subject: `[Service Inquiry] ${pkgTitle}`,
    }))
    setActiveTab("message")
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
    }, 120)
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#080b12] text-slate-900 dark:text-slate-100">
      <PortfolioNav />

      <main className="pt-20">
        {/* ── Hero ── */}
        <section className="relative pt-12 pb-8 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/50">
          {/* ambient glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/4 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6">
              <span className="text-xs text-blue-500 font-mono tracking-wider">get in touch</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  Let&apos;s Build
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Something.
                  </span>
                </h1>
              </div>

              {/* ── Segmented Tab Switcher ── */}
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 dark:bg-[#161b22] border border-slate-300/60 dark:border-slate-800 self-start md:self-end shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab("message")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === "message"
                      ? "bg-white dark:bg-[#0d1117] text-blue-600 dark:text-blue-400 shadow-md dark:shadow-none border border-slate-200/80 dark:border-slate-700/60"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Direct Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("services")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === "services"
                      ? "bg-white dark:bg-[#0d1117] text-blue-600 dark:text-blue-400 shadow-md dark:shadow-none border border-slate-200/80 dark:border-slate-700/60"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Services & Rates
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                    KES
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tab Content ── */}
        <section className="relative py-16">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

            {/* ═════════════════════════════════════════════════════════════════
                TAB 1: DIRECT MESSAGE (Preserved exactly as-is)
            ══════════════════════════════════════════════════════════════════ */}
            {activeTab === "message" && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 animate-fade-in">
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
                          className={`group flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#0d1117]/60 ${hover} transition-all duration-300 shadow-sm`}
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
                <div className="lg:col-span-3" id="contact-form">
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

                      {/* Package selected pill */}
                      {selectedPackage && (
                        <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between gap-3 text-xs text-blue-600 dark:text-blue-400 animate-fade-in">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Sparkles className="w-3.5 h-3.5" />
                            Selected Package: <strong>{selectedPackage}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPackage(null)
                              setFormData((prev) => ({ ...prev, subject: "" }))
                            }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                          >
                            ✕ Clear
                          </button>
                        </div>
                      )}

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
            )}

            {/* ═════════════════════════════════════════════════════════════════
                TAB 2: SERVICES & RATES (KES + WhatsApp + Custom Quote)
            ══════════════════════════════════════════════════════════════════ */}
            {activeTab === "services" && (
              <div className="space-y-12 animate-fade-in">
                {/* Intro header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    Development Packages & Transparent Rates
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Clear scopes, modern engineering practices, and realistic delivery timelines. 
                    Rates shown in Kenyan Shillings (KES).
                  </p>
                </div>

                {/* 3-Package Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICE_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative flex flex-col rounded-2xl border ${pkg.border} bg-white dark:bg-[#0d1117] p-7 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group overflow-hidden`}
                    >
                      {/* Top subtle highlight */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pkg.gradient}`} />

                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          pkg.popular
                            ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        }`}>
                          {pkg.badge}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          {pkg.turnaround}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {pkg.description}
                      </p>

                      {/* Price */}
                      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {pkg.price}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {pkg.period} · milestone-based
                        </span>
                      </div>

                      {/* Features */}
                      <div className="space-y-2.5 mb-8 flex-1">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                          What&apos;s Included
                        </p>
                        {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions: Request Service + WhatsApp */}
                      <div className="space-y-2.5 mt-auto pt-4">
                        <Button
                          onClick={() => handleSelectPackage(pkg.title)}
                          className={`w-full py-2.5 font-semibold text-sm transition-all duration-300 ${pkg.btnColor}`}
                        >
                          Request Package →
                        </Button>

                        <a
                          href={getWhatsAppUrl(`Hi Fred! I'm interested in discussing the "${pkg.title}" package (${pkg.price}).`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs transition-all duration-300"
                        >
                          <SiWhatsapp className="w-3.5 h-3.5" />
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Custom Quote & Bespoke Banner ── */}
                <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1117] p-8 overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-3">
                        Bespoke / Enterprise
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Need a Custom Quote?
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Have a specific architecture in mind, complex backend APIs, or need a custom solution? Let's get in touch!
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                      <Button
                        onClick={() => handleSelectPackage("Custom Scope / Bespoke Project")}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 shadow-md shadow-blue-500/20"
                      >
                        Inquire Custom Scope →
                      </Button>

                      <a
                        href={getWhatsAppUrl("Hi Fred! I have a custom project idea and would like to get a quote.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-sm transition-all duration-300"
                      >
                        <SiWhatsapp className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>
      </main>

      <PortfolioFooter />
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  )
}
