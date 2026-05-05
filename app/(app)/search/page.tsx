import { Search } from 'lucide-react'

export default function SearchPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-lg flex-col items-center justify-center px-4 text-center">
      <Search className="mb-3 h-6 w-6 text-muted-foreground" />
      <h1 className="text-lg font-semibold text-foreground">Search is coming soon</h1>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        Soon you&apos;ll be able to find posts, writers, songs, albums, and artists.
      </p>
    </main>
  )
}
