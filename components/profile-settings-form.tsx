"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface ProfileSettingsFormProps {
  userId: string;
  initialUsername: string;
  initialDisplayName: string;
  initialBio: string | null;
}

export default function ProfileSettingsForm(props: ProfileSettingsFormProps) {
  const { userId, initialUsername, initialDisplayName, initialBio } = props;
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (
    event,
  ) => {
    event.preventDefault();

    const nextUsername = username.trim().toLowerCase();
    const nextDisplayName = displayName.trim();
    const nextBio = bio.trim();

    setMessage("");
    setError("");

    if (!/^[a-z0-9_]{3,30}$/.test(nextUsername)) {
      setError(
        "Username must be 3-30 characters: lowercase letters, numbers, or underscores.",
      );
      return;
    }

    if (!nextDisplayName) {
      setError("Display name is required.");
      return;
    }

    setIsSaving(true);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("users")
      .update({
        username: nextUsername,
        display_name: nextDisplayName,
        bio: nextBio || null,
      })
      .eq("id", userId);

    if (updateError) {
      setError(
        updateError.code === "23505"
          ? "That username is already taken."
          : updateError.message,
      );
      setIsSaving(false);
      return;
    }

    setUsername(nextUsername);
    setDisplayName(nextDisplayName);
    setBio(nextBio);
    setMessage("Profile saved.");
    setIsSaving(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <div>
        <label
          htmlFor="display-name"
          className="text-sm font-medium text-foreground"
        >
          Display name
        </label>
        <input
          id="display-name"
          name="display-name"
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          maxLength={80}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label
          htmlFor="username"
          className="text-sm font-medium text-foreground"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          maxLength={30}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Lowercase letters, numbers, and underscores only.
        </p>
      </div>

      <div>
        <label htmlFor="bio" className="text-sm font-medium text-foreground">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          rows={5}
          maxLength={240}
          className="mt-1 min-h-28 w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-primary">{message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSaving ? "Saving" : "Save profile"}</span>
        </button>
      </div>
    </form>
  );
}
