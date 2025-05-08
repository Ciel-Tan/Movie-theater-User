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

      {/* Search Section */}
      {/* <section className="container py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-6">Find Your Movie</h2>
          <SearchBar />
        </div>
      </section> */}

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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((movie) => (
            <Card key={movie} className="overflow-hidden">
              <div className="aspect-[2/3] relative">
                <img
                  src={`/placeholder.svg?height=600&width=400&text=Movie+${movie}`}
                  alt={`Coming Soon Movie ${movie}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="text-white">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>Coming June 15, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">Upcoming Blockbuster {movie}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  An exciting new film that will take you on an unforgettable journey through time and space.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Watch Trailer
                  </Button>
                  <Button size="sm">Remind Me</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </section>
    </div>
  )
}
