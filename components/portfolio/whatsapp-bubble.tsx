"use client"

import React from "react"
import { SiWhatsapp } from "react-icons/si"

const WHATSAPP_NUMBER = "254710730243"
const DEFAULT_MESSAGE = "Hi Fred! I came across your portfolio and would like to connect."

export function WhatsAppBubble() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Fred on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 border-2 border-white dark:border-[#080b12] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing online beacon */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-[#080b12]" />
        </span>

        {/* WhatsApp Icon */}
        <SiWhatsapp className="w-7 h-7 fill-current" />

        {/* Desktop Hover Tooltip */}
        <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700/50 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none hidden sm:flex items-center gap-1.5">
          <span>Chat with Fred</span>
          <span className="text-emerald-400 font-normal text-[10px]">● Online</span>
        </span>
      </a>
    </aside>
  )
}
