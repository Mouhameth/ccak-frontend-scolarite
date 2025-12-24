"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  useEffect(() => {
    signIn("keycloak", { callbackUrl });
  }, [callbackUrl]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold">Redirecting to Keycloak…</h1>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        If you are not redirected, use the button below.
      </p>
      <button
        className="mt-6 rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        onClick={() => signIn("keycloak", { callbackUrl })}
      >
        Continue to Login
      </button>
      <a className="mt-4 text-xs text-zinc-500 underline" href="/forgot-password">
        Forgot password?
      </a>
    </main>
  );
}
