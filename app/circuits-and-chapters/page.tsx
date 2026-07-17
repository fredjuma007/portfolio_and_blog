import { Navigation } from "@/components/navigation"
import { EpicHero } from "@/components/epic-hero"
import { SplitHero } from "@/components/split-hero"
import { Footer } from "@/components/footer"
import { LatestPosts } from "@/components/latest-posts"
import { PageLoading } from "@/components/page-loading"

export default function BlogHomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageLoading />

      {/* Mobile: Epic Hero + 1 post from each category */}
      <div className="md:hidden">
        <EpicHero />
        <LatestPosts type="tech" title="Latest from Tech" limit={1} />
        <LatestPosts type="books" title="Latest from Books" limit={1} />
      </div>

      <div className="hidden md:block lg:hidden">
        <EpicHero />
        <LatestPosts type="tech" title="Latest from Tech" limit={2} />
        <LatestPosts type="books" title="Latest from Books" limit={2} />
      </div>

      {/* Large screens: Split Hero + 3 posts from each category */}
      <div className="hidden lg:block">
        <SplitHero />
        <LatestPosts type="tech" title="Latest from Tech" limit={3} />
        <LatestPosts type="books" title="Latest from Books" limit={3} />
      </div>

      <Footer />
    </main>
  )
}
