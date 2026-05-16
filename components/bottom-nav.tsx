"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Plus, Search } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  function handleCreatePost() {
    if (pathname === "/feed") {
      window.dispatchEvent(new Event("bridge:create-post"));
      return;
    }

    router.push("/feed?create=1");
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-3 items-center px-4">
        <Link
          href="/feed"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Feed</span>
        </Link>

        <button
          type="button"
          onClick={handleCreatePost}
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
          aria-label="Create post"
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs font-medium">Create</span>
        </button>

        <Link
          href="/search"
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
        >
          <Search className="h-5 w-5" />
          <span className="text-xs font-medium">Search</span>
        </Link>
      </div>
    </nav>
  );
}
