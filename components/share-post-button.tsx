"use client";

import { useState } from "react";
import { Check, Share } from "lucide-react";

interface SharePostButtonProps {
  postId: string;
}

export default function SharePostButton(props: SharePostButtonProps) {
  const { postId } = props;
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  async function handleShare() {
    if (isSharing) {
      return;
    }

    setIsSharing(true);
    const url = `${window.location.origin}/post/${postId}`;

    try {
      const shouldUseNativeShare =
        "share" in navigator && window.matchMedia("(pointer: coarse)").matches;

      if (shouldUseNativeShare) {
        await navigator.share({ url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        throw error;
      }
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={isSharing}
      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share className="h-4 w-4" />}
      <span>{copied ? "Copied" : "Share"}</span>
    </button>
  );
}
