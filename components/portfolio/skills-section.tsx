"use client"

import { useEffect, useRef, useState } from "react"
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiGit,
  SiVercel,
} from "react-icons/si"
import { Database } from "lucide-react"

// ─── Code tokens ─────────────────────────────────────────────────────────────
// Each segment has a text string and a CSS class for syntax colouring.
// Characters are typed one by one across all segments.

const CODE_SEGMENTS = [
  { text: "// How I approach building things\n\n", cls: "text-slate-500 italic" },
  { text: "const ", cls: "text-blue-400" },
  { text: "fred", cls: "text-white font-semibold" },
  { text: " = {\n", cls: "text-slate-400" },
  { text: "  languages", cls: "text-sky-300" },
  { text: ": [", cls: "text-slate-400" },
  { text: '"TypeScript"', cls: "text-amber-300" },
  { text: ", ", cls: "text-slate-400" },
  { text: '"JavaScript"', cls: "text-amber-300" },
  { text: ", ", cls: "text-slate-400" },
  { text: '"Python"', cls: "text-amber-300" },
  { text: "],\n\n", cls: "text-slate-400" },
  { text: "  frontend", cls: "text-sky-300" },
  { text: ": {\n", cls: "text-slate-400" },
  { text: "    frameworks", cls: "text-sky-300" },
  { text: ": [", cls: "text-slate-400" },
  { text: '"React"', cls: "text-amber-300" },
  { text: ", ", cls: "text-slate-400" },
  { text: '"Next.js"', cls: "text-amber-300" },
  { text: "],\n", cls: "text-slate-400" },
  { text: "    styling", cls: "text-sky-300" },
  { text: ":    [", cls: "text-slate-400" },
  { text: '"Tailwind CSS"', cls: "text-amber-300" },
  { text: "],\n  },\n\n", cls: "text-slate-400" },
  { text: "  backend", cls: "text-sky-300" },
  { text: ": {\n", cls: "text-slate-400" },
  { text: "    runtime", cls: "text-sky-300" },
  { text: ': "', cls: "text-slate-400" },
  { text: "Node.js", cls: "text-amber-300" },
  { text: '",\n', cls: "text-slate-400" },
  { text: "    cms", cls: "text-sky-300" },
  { text: ':     "', cls: "text-slate-400" },
  { text: "Sanity CMS", cls: "text-amber-300" },
  { text: '",\n  },\n\n', cls: "text-slate-400" },
  { text: "  tools", cls: "text-sky-300" },
  { text: ":     [", cls: "text-slate-400" },
  { text: '"Git"', cls: "text-amber-300" },
  { text: ", ", cls: "text-slate-400" },
  { text: '"Vercel"', cls: "text-amber-300" },
  { text: ", ", cls: "text-slate-400" },
  { text: '"VS Code"', cls: "text-amber-300" },
  { text: "],\n\n", cls: "text-slate-400" },
  { text: "  currently", cls: "text-sky-300" },
  { text: ': "', cls: "text-slate-400" },
  { text: "Building cool things ✨", cls: "text-green-400" },
  { text: '",\n', cls: "text-slate-400" },
  { text: "  available", cls: "text-sky-300" },
  { text: ": ", cls: "text-slate-400" },
  { text: "true", cls: "text-blue-400" },
  { text: ",\n}", cls: "text-slate-400" },
]

type Token = { char: string; cls: string }

// Pre-build flat character token array once at module level
const ALL_TOKENS: Token[] = CODE_SEGMENTS.flatMap(({ text, cls }) =>
  text.split("").map((char) => ({ char, cls }))
)

// Group consecutive same-class tokens for efficient rendering
function groupVisible(count: number): { text: string; cls: string }[] {
  const groups: { text: string; cls: string }[] = []
  for (let i = 0; i < count; i++) {
    const { char, cls } = ALL_TOKENS[i]
    const last = groups[groups.length - 1]
    if (last && last.cls === cls) {
      last.text += char
    } else {
      groups.push({ text: char, cls })
    }
  }
  return groups
}

// ─── Tech stack cards ─────────────────────────────────────────────────────────

const TECH_STACK = [
  { name: "TypeScript",  Icon: SiTypescript,  color: "#3b82f6", label: "daily driver" },
  { name: "React",       Icon: SiReact,        color: "#38bdf8", label: "frontend"     },
  { name: "Next.js",     Icon: SiNextdotjs,    color: "#ffffff", label: "full stack"   },
  { name: "Node.js",     Icon: SiNodedotjs,    color: "#22c55e", label: "backend"      },
  { name: "JavaScript",  Icon: SiJavascript,   color: "#fbbf24", label: "the OG"       },
  { name: "Python",      Icon: SiPython,       color: "#93c5fd", label: "scripting"    },
  { name: "Tailwind",    Icon: SiTailwindcss,  color: "#22d3ee", label: "styling"      },
  { name: "Git",         Icon: SiGit,          color: "#f97316", label: "always"       },
  { name: "Vercel",      Icon: SiVercel,       color: "#ffffff", label: "deployment"   },
  { name: "Sanity CMS",  Icon: null,           color: "#e2574c", label: "cms / content"},
]

// ─── Component ────────────────────────────────────────────────────────────────

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [inView, setInView] = useState(false)
  const animStarted = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Fire IntersectionObserver once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animStarted.current) {
          animStarted.current = true
          setInView(true)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Start character-by-character reveal when inView
  useEffect(() => {
    if (!inView) return

    let count = 0
    intervalRef.current = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= ALL_TOKENS.length && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 11) // ~90 chars/sec — feels like fast typing

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [inView])

  const groups = groupVisible(visibleCount)
  const isTyping = visibleCount < ALL_TOKENS.length

  // Line numbers: count newlines in visible text
  const lineCount = ALL_TOKENS.slice(0, visibleCount)
    .filter((t) => t.char === "\n").length + 1

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1117 0%, #080b12 100%)" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-4">
            <span className="text-xs text-blue-400 font-mono tracking-wider">01 / skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What I Work With
          </h2>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            The tools and technologies I reach for when building things.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Code panel (left) ── */}
          <div
            className="rounded-2xl border border-slate-700/40 overflow-hidden shadow-2xl shadow-blue-500/5"
            style={{ background: "#0d1117" }}
          >
            {/* Editor title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/40 bg-[#161b22]/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-slate-500 ml-2 font-mono">fred.ts</span>
              <span className="ml-auto text-xs text-slate-600 font-mono">TypeScript</span>
            </div>

            {/* Code area */}
            <div className="flex gap-0 p-5 overflow-x-auto">
              {/* Line numbers */}
              <div className="shrink-0 w-8 mr-4 text-right select-none font-mono text-xs text-slate-600 leading-[1.625rem]">
                {Array.from({ length: Math.max(lineCount, 22) }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code */}
              <pre className="font-mono text-sm leading-[1.625rem] flex-1 overflow-x-auto">
                {groups.map((g, i) => (
                  <span key={i} className={g.cls}>
                    {g.text}
                  </span>
                ))}
                {isTyping && (
                  <span className="text-blue-400 animate-pulse">▌</span>
                )}
              </pre>
            </div>
          </div>

          {/* ── Tech stack cards (right) ── */}
          <div className="grid grid-cols-2 gap-3">
            {TECH_STACK.map((tech, index) => (
              <div
                key={tech.name}
                className={`group rounded-xl p-4 border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 hover:scale-[1.03] cursor-default ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  background: "rgba(13, 17, 23, 0.9)",
                  animationDelay: `${index * 75}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex flex-col gap-2.5">
                  {/* Icon */}
                  {tech.Icon ? (
                    <tech.Icon
                      className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                    />
                  ) : (
                    // Sanity CMS fallback — custom badge
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${tech.color}22`, color: tech.color }}
                    >
                      <Database className="w-4 h-4" style={{ color: tech.color }} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-200 leading-tight">
                      {tech.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{tech.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
