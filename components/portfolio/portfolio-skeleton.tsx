"use client"

import { useEffect, useState } from "react"

function Bone({ className }: { className: string }) {
  return (
    <div
      className={`rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`}
    />
  )
}

export function PortfolioSkeleton() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#080b12] overflow-y-auto">

      {/* ── Fake nav ── */}
      <div className="h-20 border-b border-slate-100 dark:border-slate-800/50 flex items-center px-8 gap-8">
        <Bone className="w-24 h-5" />
        <div className="flex-1" />
        <Bone className="w-14 h-4" />
        <Bone className="w-14 h-4" />
        <Bone className="w-14 h-4" />
        <Bone className="w-8 h-8 rounded-full" />
      </div>

      {/* ── Fake hero ── */}
      <div className="px-8 py-20 max-w-7xl mx-auto">
        <Bone className="w-40 h-3 mb-6" />
        {/* Big name */}
        <Bone className="w-3/4 h-16 mb-3" />
        <Bone className="w-1/2 h-16 mb-10" />
        {/* Terminal card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 max-w-md">
          <div className="flex gap-1.5 mb-4">
            <Bone className="w-3 h-3 rounded-full" />
            <Bone className="w-3 h-3 rounded-full" />
            <Bone className="w-3 h-3 rounded-full" />
          </div>
          <Bone className="w-full h-3 mb-2" />
          <Bone className="w-4/5 h-3 mb-2" />
          <Bone className="w-3/5 h-3 mb-2" />
          <Bone className="w-2/4 h-3" />
        </div>
        {/* CTAs */}
        <div className="flex gap-3 mt-6">
          <Bone className="w-36 h-10" />
          <Bone className="w-32 h-10" />
        </div>
      </div>

      {/* ── Fake skills ── */}
      <div className="px-8 py-16 bg-slate-50 dark:bg-[#0d1117] max-w-7xl mx-auto rounded-2xl mb-8">
        <Bone className="w-24 h-3 mx-auto mb-4" />
        <Bone className="w-48 h-8 mx-auto mb-10" />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Bone key={i} className="h-20" />
          ))}
        </div>
      </div>

      {/* ── Fake projects rail ── */}
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <Bone className="w-24 h-3 mb-4" />
        <Bone className="w-48 h-8 mb-10" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <Bone className="w-full h-40 rounded-none" />
              <div className="p-4 space-y-2">
                <Bone className="w-3/4 h-4" />
                <Bone className="w-full h-3" />
                <Bone className="w-2/3 h-3" />
                <div className="flex gap-2 mt-3">
                  <Bone className="w-16 h-6" />
                  <Bone className="w-16 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
