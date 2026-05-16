"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
}

export default function BackButton(props: BackButtonProps) {
  const { fallbackHref = "/feed", label = "Back" } = props;
  const router = useRouter();

  function handleBack() {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const cameFromBridge = referrer?.origin === window.location.origin;

    if (cameFromBridge && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
