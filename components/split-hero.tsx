"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BookOpen, Sparkles, Code, Bookmark } from "lucide-react"
import { useState, useEffect } from "react"

export function SplitHero() {
  const [hoveredSide, setHoveredSide] = useState<"tech" | "books" | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        className={`flex-1 relative overflow-hidden transition-all duration-700 ease-out tech-theme ${
          hoveredSide === "tech" ? "lg:flex-[1.1]" : hoveredSide === "books" ? "lg:flex-[0.9]" : ""
        }`}
        onMouseEnter={() => setHoveredSide("tech")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 lg:p-16 text-center">
          <div className="mb-12 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Tech
              </span>
              <br />
              <span className="text-foreground/90">Jibijaber</span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Exploring the world of technology from tech news to deep dives and more
              <br className="hidden lg:block" />
              your go-to source for all things tech
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-10 w-full max-w-lg">
            {[
              { icon: Code, title: "Apps & Tools", desc: "Latest frameworks & tools", tag: "apps-tools" },
              { icon: Zap, title: "AI", desc: "Artificial Intelligence", tag: "ai" },
              // { icon: Sparkles, title: "Reviews", desc: "Tech reviews & analysis", tag: "reviews" },
              // { icon: ArrowRight, title: "Recommendations", desc: "Curated picks", tag: "recommendations" },
            ].map((item, index) => (
              <Link
                key={item.title}
                href={`/tech?tag=${item.tag}`}
                className="group bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="group bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/tech">
              Explore Tech Universe
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div
        className={`flex-1 relative overflow-hidden transition-all duration-700 ease-out books-theme ${
          hoveredSide === "books" ? "lg:flex-[1.1]" : hoveredSide === "tech" ? "lg:flex-[0.9]" : ""
        }`}
        onMouseEnter={() => setHoveredSide("books")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-amber-500/5 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 lg:p-16 text-center">
          <div className="mb-12 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                Chapters
              </span>
              <br />
              <span className="text-foreground/90">& Stories</span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Diving deep into literary worlds, reviews, and general bookish delights
              <br className="hidden lg:block" />
              your gateway to all things books and beyond
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-10 w-full max-w-lg">
            {[
              { icon: BookOpen, title: "Reviews", desc: "Honest & insightful", tag: "reviews" },
              { icon: Bookmark, title: "Curated Lists", desc: "Handpicked favorites", tag: "curated-lists" },
              // { icon: Sparkles, title: "Recommendations", desc: "Must-read picks", tag: "recommendations" },
              // { icon: BookOpen, title: "Author Spotlights", desc: "Meet the creators", tag: "author-spotlights" },
            ].map((item, index) => (
              <Link
                key={item.title}
                href={`/books?tag=${item.tag}`}
                className="group bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="group bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/books">
              Explore Literary World
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-background border-2 border-border rounded-full" />
      </div>
    </section>
  )
}
