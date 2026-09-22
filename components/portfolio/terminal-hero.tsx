"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

//  Types

interface Line {
  id: string
  type: "command" | "output" | "status" | "spacer" | "cursor"
  text: string
  partial?: boolean
}

// Terminal sequence 

const TYPING_SPEED = 48         // ms per character
const PAUSE_AFTER_COMMAND = 280  // ms after command finishes before output shows
const PAUSE_BETWEEN = 600        // ms between sequence items
const INITIAL_DELAY = 1100       // ms before first character

const SEQUENCES: Array<{
  command: string
  outputs: Array<{ text: string; type: "output" | "status" | "spacer" }>
}> = [
    {
      command: "whoami",
      outputs: [
        { text: "Fred Juma — Software Developer · Nairobi, Kenya 🇰🇪", type: "output" },
        { text: "", type: "spacer" },
      ],
    },
    {
      command: "cat stack.txt",
      outputs: [
        { text: "TypeScript · React · Next.js · Node.js · Kotlin · Python · MySQL · PostgreSQL · Cloudflare · Firebase", type: "output" },
        { text: "", type: "spacer" },
      ],
    },
    {
      command: "git log --oneline -2",
      outputs: [
        { text: "a3f2c1d  best project: VNOR typesetting engine", type: "output" },
        { text: "7b1e09a  portfolio: finally rebuilding this thing", type: "output" },
        { text: "", type: "spacer" },
      ],
    },
    {
      command: "status --check",
      outputs: [
        { text: "● Open to opportunities", type: "status" },
      ],
    },
  ]

//  Component 

export function TerminalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lines, setLines] = useState<Line[]>([])

  // Canvas: particle + grid animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.35 + 0.08,
      })
    }

    let animFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Subtle grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.055)"
      ctx.lineWidth = 1
      const grid = 65
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Particles + connections
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 179, 237, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 115) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(99, 179, 237, ${0.07 * (1 - dist / 115)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  // Terminal typing animation
  useEffect(() => {
    let cancelled = false
    let idCounter = 0
    const nextId = () => String(idCounter++)
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

    let currentLines: Line[] = []

    const typeCommand = async (command: string) => {
      const id = nextId()
      currentLines = [...currentLines, { id, type: "command", text: "", partial: true }]
      setLines([...currentLines])

      for (let i = 1; i <= command.length; i++) {
        if (cancelled) return
        await sleep(TYPING_SPEED)
        currentLines = currentLines.map((l) =>
          l.id === id ? { ...l, text: command.slice(0, i) } : l
        )
        setLines([...currentLines])
      }

      // Command fully typed
      currentLines = currentLines.map((l) =>
        l.id === id ? { ...l, partial: false } : l
      )
      setLines([...currentLines])
    }

    const run = async () => {
      await sleep(INITIAL_DELAY)

      for (const seq of SEQUENCES) {
        if (cancelled) return
        await typeCommand(seq.command)
        if (cancelled) return
        await sleep(PAUSE_AFTER_COMMAND)

        for (const out of seq.outputs) {
          if (cancelled) return
          const id = nextId()
          currentLines = [...currentLines, { id, type: out.type, text: out.text }]
          setLines([...currentLines])
          await sleep(55)
        }

        await sleep(PAUSE_BETWEEN)
      }

      if (cancelled) return
      const id = nextId()
      currentLines = [...currentLines, { id, type: "cursor", text: "" }]
      setLines([...currentLines])
    }

    run()
    return () => { cancelled = true }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#080b12] pt-20"
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Decorative floating shapes (desktop only) */}
      <div className="absolute top-32 left-8 w-16 h-16 border border-blue-500/10 rounded-lg rotate-12 animate-pulse hidden lg:block" />
      <div
        className="absolute top-52 right-12 w-10 h-10 border border-amber-500/10 rounded-full animate-spin hidden lg:block"
        style={{ animationDuration: "25s" }}
      />
      <div className="absolute bottom-36 left-16 w-8 h-8 bg-blue-500/5 rounded-lg rotate-45 animate-pulse hidden lg:block" />
      <div className="absolute bottom-52 right-10 w-14 h-14 border border-amber-500/10 rounded-lg -rotate-12 animate-pulse hidden lg:block" />

      {/* Main content — name gets full viewport width, rest is constrained */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-4">

        {/* Name — one massive line, fills the screen */}
        <div className="w-full mb-3 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <h1
            className="font-black tracking-tighter leading-none whitespace-nowrap text-center select-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              FRED
            </span>
            <span className="text-slate-900 dark:text-white" aria-hidden>{" "}</span>
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              JUMA
            </span>
          </h1>
        </div>

        {/* Constrained column for everything below the name */}
        <div className="w-full max-w-2xl">

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-8 tracking-widest uppercase animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Software Developer · Nairobi, Kenya 🇰🇪
          </p>

          {/* Terminal card */}
          <div
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700/40 overflow-hidden shadow-xl dark:shadow-blue-500/5 mb-8 animate-fade-in-up bg-white/80 dark:bg-[#0d1117]/85 backdrop-blur-sm"
            style={{ animationDelay: "350ms" }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200 dark:border-slate-700/40 bg-slate-100/80 dark:bg-[#161b22]/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors duration-200" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors duration-200" />
                <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors duration-200" />
              </div>
              <span className="text-xs text-slate-500 ml-2 font-mono select-none">
                ~/fred-juma/portfolio — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div className="px-5 py-5 font-mono text-sm text-left min-h-[200px]">
              {/* Initial prompt */}
              {lines.length === 0 && (
                <div className="flex items-center gap-2 leading-6">
                  <span className="text-blue-500 dark:text-blue-400 select-none">{">"}</span>
                  <span className="text-blue-500 dark:text-blue-400 animate-pulse">▌</span>
                </div>
              )}

              {lines.map((line) => {
                if (line.type === "spacer") {
                  return <div key={line.id} className="h-2" />
                }
                if (line.type === "command") {
                  return (
                    <div key={line.id} className="flex items-center gap-2 leading-6">
                      <span className="text-blue-500 dark:text-blue-400 select-none shrink-0">{">"}</span>
                      <span className="text-slate-900 dark:text-slate-100">{line.text}</span>
                      {line.partial && (
                        <span className="text-blue-500 dark:text-blue-400 animate-pulse">▌</span>
                      )}
                    </div>
                  )
                }
                if (line.type === "output") {
                  return (
                    <div key={line.id} className="text-slate-600 dark:text-slate-400 pl-5 leading-6">
                      {line.text}
                    </div>
                  )
                }
                if (line.type === "status") {
                  return (
                    <div key={line.id} className="text-green-600 dark:text-green-400 pl-5 leading-6 font-medium">
                      {line.text}
                    </div>
                  )
                }
                if (line.type === "cursor") {
                  return (
                    <div key={line.id} className="flex items-center gap-2 leading-6 mt-1">
                      <span className="text-blue-500 dark:text-blue-400 select-none shrink-0">{">"}</span>
                      <span className="text-blue-500 dark:text-blue-400 animate-pulse">▌</span>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in-up"
            style={{ animationDelay: "550ms" }}
          >
            <Link
              href="/contact"
              className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 overflow-hidden"
            >
              <span className="relative z-10">Let's Work Together →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl border border-amber-500/40 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold text-base hover:bg-amber-500/10 hover:border-amber-500/70 transition-all duration-300"
            >
              See My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

        </div> {/* end constrained column */}
      </div>

      {/* Scroll bounce indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ArrowDown className="w-5 h-5 text-slate-400" />
      </div>
    </section>
  )
}
