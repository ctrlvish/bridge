"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuthErrorMessage, isValidEmail } from "@/lib/auth-errors";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const passwordMatch = password === cfmPassword;
  const router = useRouter();

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !cfmPassword) {
      setError("Fill out all fields to create your account.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!passwordMatch) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: password,
    });

    if (error) {
      setError(getAuthErrorMessage(error));
      return;
    }

    if (data.user) {
      router.push("/feed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          ></input>

          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          ></input>

          <label htmlFor="confirm-password-input">Confirm password</label>
          <input
            id="confirm-password-input"
            name="confirm-password"
            type="password"
            onChange={(e) => setCfmPassword(e.target.value)}
            value={cfmPassword}
            className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
          ></input>
          {!passwordMatch && submitted && !error && (
            <p className="text-destructive text-sm">Passwords do not match.</p>
          )}
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm mt-5 cursor-pointer">
            Sign up
          </button>
        </form>
        <Link href="/login" className="text-primary underline">
          Have an account? Log in
        </Link>
      </div>
    </div>
  );
}
