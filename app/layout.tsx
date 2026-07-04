import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import ScrollUpButton from "@/components/scrollup"
import ComingSoonWrapper from "@/components/coming-soon-wrapper"

export const metadata: Metadata = {
  metadataBase: new URL("https://circuits-chapters.vercel.app"),
  title: {
    default: "Fred Juma — Software Developer",
    template: "%s | Fred Juma",
  },
  description:
    "Portfolio of Fred Juma, a software developer based in Nairobi, Kenya. Building with TypeScript, React, Next.js, and Sanity CMS. Creator of Circuits & Chapters.",
  generator: "Next.js",
  applicationName: "Fred Juma Portfolio",
  authors: [{ name: "Fred Juma", url: "https://circuits-chapters.vercel.app" }],
  keywords: [
    "Fred Juma",
    "Software Developer",
    "Nairobi",
    "Kenya",
    "Portfolio",
    "TypeScript",
    "React",
    "Next.js",
    "Full Stack Developer",
    "Frontend Developer",
    "Sanity CMS",
    "Node.js",
    "Web Developer",
    "Circuits and Chapters",
    "Jibijaber",
    "Tech Blog",
    "Book Reviews",
  ],
  openGraph: {
    title: "Fred Juma — Software Developer",
    description:
      "Portfolio of Fred Juma, software developer based in Nairobi, Kenya.",
    url: "https://circuits-chapters.vercel.app",
    siteName: "Fred Juma",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/Circuits%20&%20Chapters%20logo.png",
        width: 1200,
        height: 630,
        alt: "Fred Juma — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fred Juma — Software Developer",
    description:
      "Software developer based in Nairobi, Kenya. Building cool things with TypeScript, React & Next.js.",
    creator: "@Fredjuma8Rennox",
    images: ["/Circuits%20&%20Chapters%20logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://circuits-chapters.vercel.app",
  },
  icons: {
    icon: "/Circuits%20&%20Chapters%20logo.png",
    apple: "/Circuits%20&%20Chapters%20logo.png",
  },
  category: "Software Development",
}

// themeColor for viewport meta tag
export const viewport: Viewport = {
  themeColor: "#0f172a",
}

export const revalidate = 0

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ComingSoonWrapper>{children}</ComingSoonWrapper>
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <ScrollUpButton />
      </body>
    </html>
  )
}
