import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <Skeleton className="h-16 w-full mb-8" />
      <Skeleton className="h-4 w-64 mb-6" />

      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="mb-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}
