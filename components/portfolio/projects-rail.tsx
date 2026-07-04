"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { client, urlFor, type Project } from "@/lib/sanity"

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  live: { dot: "bg-green-400", text: "text-green-400", label: "Live" },
  "in-progress": { dot: "bg-yellow-400", text: "text-yellow-400", label: "In Progress" },
  archived: { dot: "bg-slate-400", text: "text-slate-400", label: "Archived" },
} as const

// ─── Single project card ──────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.live
  const imageUrl = project.thumbnail
    ? urlFor(project.thumbnail).width(760).height(428).url()
    : null

  return (
    <article className="shrink-0 w-[340px] sm:w-[380px] snap-start rounded-2xl border border-slate-700/40 overflow-hidden flex flex-col group hover:border-slate-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
      style={{ background: "rgba(13, 17, 23, 0.95)" }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-slate-800/60 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <span className="text-2xl font-black text-blue-500/40 select-none">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-sm">
            ★ Featured
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-slate-700/50 backdrop-blur-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech stack pills */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-blue-500/8 border border-blue-500/15 text-blue-300/80 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div className="mt-auto flex gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-600/60 text-slate-300 text-sm font-semibold hover:bg-slate-700/40 hover:border-slate-500 transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Draggable scroll rail ────────────────────────────────────────────────────

function ScrollRail({ projects }: { projects: Project[] }) {
  const railRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = railRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollButtons, { passive: true })
    updateScrollButtons()
    return () => el.removeEventListener("scroll", updateScrollButtons)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (railRef.current?.offsetLeft ?? 0)
    scrollStart.current = railRef.current?.scrollLeft ?? 0
    if (railRef.current) railRef.current.style.cursor = "grabbing"
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !railRef.current) return
    e.preventDefault()
    const x = e.pageX - (railRef.current.offsetLeft ?? 0)
    railRef.current.scrollLeft = scrollStart.current - (x - startX.current)
  }

  const stopDrag = () => {
    isDragging.current = false
    if (railRef.current) railRef.current.style.cursor = "grab"
  }

  const scrollBy = (dir: "left" | "right") => {
    railRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#080b12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#080b12] to-transparent z-10 pointer-events-none" />

      {/* Scroll buttons (desktop) */}
      {canScrollLeft && (
        <button
          onClick={() => scrollBy("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all duration-200 shadow-lg hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollBy("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all duration-200 shadow-lg hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* The rail */}
      <div
        ref={railRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="flex gap-5 overflow-x-auto pb-6 px-6 lg:px-12 select-none"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {/* Scroll hint text */}
      <p className="text-center text-xs text-slate-600 mt-1 hidden md:block select-none">
        drag to scroll · or use the arrows
      </p>
    </div>
  )
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex justify-center px-6">
      <div className="max-w-sm w-full text-center py-16 px-8 rounded-2xl border border-dashed border-slate-700/60">
        <div className="text-5xl mb-4">🏗️</div>
        <h3 className="text-slate-300 font-semibold mb-2">Projects loading...</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Add your projects in Sanity Studio at{" "}
          <a href="/studio" className="text-blue-400 font-mono hover:text-blue-300 transition-colors">
            /studio
          </a>
          {" "}under Projects.
        </p>
      </div>
    </div>
  )
}

// ─── Main exported component ──────────────────────────────────────────────────

export function ProjectsRail() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const query = `*[_type == "project"] | order(featured desc, order asc) {
      _id, title, slug, description, thumbnail, techStack, liveUrl, githubUrl, featured, status
    }`

    client
      .fetch(query)
      .then((data) => setProjects(data ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080b12 0%, #0d1117 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/2 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="relative">
        {/* Section header */}
        <div className="text-center mb-12 px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-4">
            <span className="text-xs text-amber-400 font-mono tracking-wider">02 / projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What I've Built
          </h2>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            A selection of projects — personal, open source, and client work.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollRail projects={projects} />
        )}
      </div>
    </section>
  )
}
