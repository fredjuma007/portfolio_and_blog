"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/blog" className="group flex items-center space-x-3">
            <div className="relative w-10 h-10 transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/Circuits & Chapters logo.png"
                alt="Circuits & Chapters"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl tracking-tight text-balance group-hover:text-primary transition-colors duration-300">
                Circuits & Chapters
              </span>
              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Jibijaber</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: "/blog", label: "Home" },
              { href: "/tech", label: "Tech" },
              { href: "/books", label: "Books" },
              { href: "/", label: "Portfolio" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}

            <div className="ml-6 pl-6 border-l border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-10 h-10 rounded-full hover:bg-accent/50 transition-colors duration-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full">
              <div className="relative w-5 h-5">
                <span
                  className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative py-4 space-y-1 border-t border-border/50 bg-background/95 backdrop-blur-xl rounded-b-2xl shadow-2xl">
            <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
              <div className="absolute top-2 left-4 w-2 h-2 bg-blue-500/30 rounded-full animate-float" />
              <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-float-delayed" />
              <div className="absolute bottom-4 left-1/3 w-1 h-1 bg-purple-500/30 rounded-full animate-float" />
              <div className="absolute bottom-2 right-1/4 w-2 h-2 bg-cyan-500/20 rounded-full animate-float-delayed" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 rounded-b-2xl" />

            <div className="relative z-10">
              {[
                { href: "/blog", label: "Home" },
                { href: "/tech", label: "Tech" },
                { href: "/books", label: "Books" },
                { href: "/", label: "Portfolio" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block px-6 py-4 text-sm font-medium text-foreground/80 hover:text-foreground rounded-xl mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/5 hover:to-amber-500/10 hover:shadow-lg hover:shadow-blue-500/10"
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-xl" />
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              ))}

              <div className="px-6 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full justify-start relative group bg-gradient-to-r from-background/50 to-background/30 hover:from-blue-500/10 hover:to-amber-500/10 border border-border/30 hover:border-border/60 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-xl" />
                  <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 relative z-10" />
                  <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 z-10" />
                  <span className="relative z-10">Toggle theme</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
