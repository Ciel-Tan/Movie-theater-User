import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MovieCarousel } from "@/components/movie-carousel"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background z-10" />
        <div
          className="h-[500px] bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Experience Movies Like Never Before
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Immerse yourself in the latest blockbusters with state-of-the-art sound and picture quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" asChild>
              <Link href="/now-showing">Now Showing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/coming-soon">Coming Soon</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="container py-8 px-15">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Now Showing</h2>
          <Button variant="outline" asChild>
            <Link href="/now-showing">View All</Link>
          </Button>
        </div>
        <MovieCarousel type="now-showing"/>
      </section>

      {/* Coming Soon Section */}
      <section className="container py-8 px-15 bg-muted/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Coming Soon</h2>
          <Button variant="outline" asChild>
            <Link href="/coming-soon">View All</Link>
          </Button>
        </div>
        <MovieCarousel type="coming-soon" />
      </section>
    </div>
  )
}
