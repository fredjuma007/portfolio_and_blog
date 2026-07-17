"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Facebook, Instagram, ArrowRight, Mail } from "lucide-react"
import { SiX, SiGoodreads, SiTiktok } from "react-icons/si"

const QUICK_LINKS = [
  // Portfolio sections
  { href: "#home",     label: "Home",        color: "hover:text-blue-500"  },
  { href: "#skills",   label: "Skills",      color: "hover:text-blue-500"  },
  { href: "#projects", label: "Projects",    color: "hover:text-blue-500"  },
  { href: "/contact",  label: "Contact",     color: "hover:text-blue-500"  },
  // Blog
  { href: "/circuits-and-chapters", label: "Blog",  color: "hover:text-amber-500" },
]

const SOCIAL_LINKS = [
  {
    href: "https://github.com/fredjuma007",
    label: "GitHub",
    icon: Github,
    className: "hover:bg-blue-500/10 hover:text-blue-500",
  },
  {
    href: "http://x.com/Fredjuma8Rennox",
    label: "X",
    icon: SiX,
    className: "hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
  },
  {
    href: "https://www.facebook.com/rennox.morrison/",
    label: "Facebook",
    icon: Facebook,
    className: "hover:bg-blue-600/10 hover:text-blue-600",
  },
  {
    href: "https://www.instagram.com/fred_peterz/",
    label: "Instagram",
    icon: Instagram,
    className: "hover:bg-pink-500/10 hover:text-pink-500",
  },
  {
    href: "https://www.goodreads.com/user/show/120096874-fred",
    label: "Goodreads",
    icon: SiGoodreads,
    className: "hover:bg-amber-600/10 hover:text-amber-600",
  },
  {
    href: "https://www.tiktok.com/@fred_peters",
    label: "TikTok",
    icon: SiTiktok,
    className: "hover:bg-black/10 hover:text-black dark:hover:bg-white/10 dark:hover:text-white",
  },
]

function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#")) {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }
}

export function PortfolioFooter() {
  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/30 to-background border-t border-border/50 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl animate-float" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-lg animate-float-delayed" />
        <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-gradient-to-br from-slate-400/5 to-transparent rounded-full blur-xl animate-float-slow" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_25px,rgba(255,255,255,0.05)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.05)_75px,rgba(255,255,255,0.05)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:75px_75px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* ── Left: Identity + CTA ── */}
          <div className="col-span-1 md:col-span-2">
            {/* FJ Monogram + name */}
            <Link href="/" className="group flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300">
                <span className="text-white font-black text-sm tracking-tight select-none">FJ</span>
              </div>
              <div>
                <span className="font-bold text-lg text-foreground group-hover:text-blue-500 transition-colors duration-300 tracking-tight">
                  Fred Juma
                </span>
                <div className="text-xs text-muted-foreground font-mono tracking-wider">
                  Software Developer
                </div>
              </div>
            </Link>

            <p className="text-muted-foreground mb-2 max-w-xs leading-relaxed">
              Building things with TypeScript, React & Next.js — from Nairobi, Kenya 🇰🇪
            </p>
            <p className="text-xs text-muted-foreground/70 mb-6 font-mono">
              ● Open to opportunities
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
                >
                  Let&apos;s work together
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="mailto:fredjuma8@gmail.com">
                <Button
                  variant="outline"
                  className="border-border/60 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-1.5" />
                  Email me
                </Button>
              </a>
            </div>
          </div>

          {/* ── Middle: Quick Links ── */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground/90 tracking-wide text-sm uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) =>
                link.href.startsWith("#") ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className={`text-muted-foreground ${link.color} transition-all duration-200 hover:translate-x-1 inline-block text-sm cursor-pointer`}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-muted-foreground ${link.color} transition-all duration-200 hover:translate-x-1 inline-block text-sm`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ── Right: Connect ── */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground/90 tracking-wide text-sm uppercase">
              Connect
            </h3>
            <div className="flex flex-wrap gap-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, className }) => (
                <Button
                  key={href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`hover:scale-110 transition-all duration-300 ${className}`}
                >
                  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            {/* GitHub highlight */}
            <div className="mt-6">
              <a
                href="https://github.com/fredjuma007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <Github className="w-4 h-4 group-hover:text-blue-500 transition-colors duration-200" />
                <span className="font-mono">github.com/fredjuma007</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <p>&copy; 2025 Fred Juma. All rights reserved.</p>
          <p className="font-mono text-xs text-muted-foreground/60">
            Built with Next.js &amp; Sanity CMS
          </p>
        </div>
      </div>
    </footer>
  )
}
