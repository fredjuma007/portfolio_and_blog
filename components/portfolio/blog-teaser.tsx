import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, BookOpen } from "lucide-react"
import { client, urlFor, type Post } from "@/lib/sanity"

async function getLatestByType(type: "tech" | "books"): Promise<Post | null> {
  try {
    const query = `
      *[_type == "post" && category->type == "${type}"] | order(_createdAt desc) [0] {
        _id, title, slug,
        category->{ name, type },
        featuredImage, excerpt, _createdAt
      }
    `
    return await client.fetch(query)
  } catch {
    return null
  }
}

function PostPreview({
  post,
  theme,
}: {
  post: Post | null
  theme: "tech" | "books"
}) {
  const isTech = theme === "tech"
  const color = isTech ? "blue" : "amber"
  const href = post ? `/${theme}/${post.slug.current}` : `/${theme}`

  const imageUrl = post?.featuredImage
    ? urlFor(post.featuredImage).width(600).height(340).url()
    : null

  return (
    <Link
      href={href}
      className={`group relative flex-1 min-w-0 rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
        isTech
          ? "border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/10"
          : "border-amber-500/20 hover:border-amber-500/40 hover:shadow-amber-500/10"
      } bg-white dark:bg-[#0d1117] border-slate-200 dark:border-slate-800/60`}
    >
      {/* Top accent bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${
          isTech ? "from-blue-600 to-cyan-500" : "from-amber-500 to-orange-500"
        }`}
      />

      {/* Thumbnail */}
      {imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={post?.title ?? ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-70"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0d1117] via-transparent to-transparent"
          />
        </div>
      )}

      <div className="p-6">
        {/* Section label */}
        <div
          className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border text-xs font-semibold ${
            isTech
              ? "border-blue-500/20 bg-blue-500/8 text-blue-500 dark:text-blue-400"
              : "border-amber-500/20 bg-amber-500/8 text-amber-600 dark:text-amber-400"
          }`}
        >
          {isTech ? (
            <Zap className="w-3 h-3" />
          ) : (
            <BookOpen className="w-3 h-3" />
          )}
          {isTech ? "Tech Jibijaber" : "Chapters & Stories"}
        </div>

        {post ? (
          <>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {isTech ? "Tech articles & insights" : "Book reviews & literary dives"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {isTech
                ? "Exploring technology, software, and the things I'm building."
                : "Reviews, recommendations, and thoughts on the books I've been reading."}
            </p>
          </>
        )}

        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5 ${
            isTech ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"
          }`}
        >
          {post ? "Read article" : "Browse posts"}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export async function BlogTeaser() {
  const [techPost, booksPost] = await Promise.all([
    getLatestByType("tech"),
    getLatestByType("books"),
  ])

  return (
    <section
      id="blog"
      className="relative py-24 overflow-hidden bg-slate-50 dark:bg-[#0d1117]"
    >
      {/* Dual-tone ambient glows */}
      <div className="absolute top-1/2 left-8 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-8 w-72 h-72 bg-amber-500/4 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-800/30 mb-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wider">03 / writing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Circuits &amp; Chapters
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            My blog — where tech sparks meet story pages.
          </p>
        </div>

        {/* Two-panel preview */}
        <div className="flex flex-col sm:flex-row gap-5">
          <PostPreview post={techPost} theme="tech" />
          <PostPreview post={booksPost} theme="books" />
        </div>

        {/* CTA to full blog */}
        <div className="text-center mt-10">
          <Link
            href="/circuits-and-chapters"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:scale-105"
          >
            Browse all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

