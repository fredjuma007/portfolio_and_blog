import { PortfolioNav } from "@/components/portfolio/portfolio-nav"
import { TerminalHero } from "@/components/portfolio/terminal-hero"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ProjectsRail } from "@/components/portfolio/projects-rail"
import { BlogTeaser } from "@/components/portfolio/blog-teaser"
import { PortfolioFooter } from "@/components/portfolio/portfolio-footer"
import { PageLoading } from "@/components/page-loading"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#080b12]">
      <PortfolioNav />
      <PageLoading />

      <TerminalHero />
      <SkillsSection />
      <ProjectsRail />
      <BlogTeaser />
      <PortfolioFooter />
    </main>
  )
}
