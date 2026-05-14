"use client";

import { useState } from "react";
import { Send, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface CreatePostFormProps {
  isAuthenticated: boolean;
}

export default function CreatePostForm(props: CreatePostFormProps) {
  const { isAuthenticated } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (
    event,
  ) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedSpotifyUrl = spotifyUrl.trim();

    if (!trimmedTitle || !trimmedBody) {
      setError("Title and body are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      setError("Log in again before posting.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("posts").insert({
      user_id: authData.user.id,
      title: trimmedTitle,
      body: trimmedBody,
      spotify_url: trimmedSpotifyUrl || null,
    });

    if (insertError) {
      setError(insertError.message);
      setIsSubmitting(false);
      return;
    }

    setTitle("");
    setBody("");
    setSpotifyUrl("");
    setIsOpen(false);
    setIsSubmitting(false);
    router.refresh();
  };

  if (!isAuthenticated) {
    return (
      <a
        href="/login"
        className="mb-4 flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
          <User className="h-4 w-4" />
        </span>
        <span>Log in to share what&apos;s on your mind</span>
      </a>
    );
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mb-4 flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
          <User className="h-4 w-4" />
        </span>
        <span>What song&apos;s on your mind?</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-2xl border border-border bg-card p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-foreground">Create post</h1>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setError("");
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close create post form"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          maxLength={120}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />

        <textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write your thoughts"
          rows={5}
          maxLength={2000}
          className="min-h-32 w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          name="spotify-url"
          type="url"
          value={spotifyUrl}
          onChange={(event) => setSpotifyUrl(event.target.value)}
          placeholder="Spotify link"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          <span>{isSubmitting ? "Posting" : "Post"}</span>
        </button>
      </div>
    </form>
  );
}
