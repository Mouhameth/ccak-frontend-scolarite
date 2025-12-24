"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "unauthenticated" || session?.error === "RefreshAccessTokenError") {
      const query = searchParams.toString();
      const callbackUrl = query ? `${pathname}?${query}` : pathname;
      const loginUrl = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      router.replace(loginUrl);
    }
  }, [status, session?.error, pathname, searchParams, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">
        Checking your session…
      </div>
    );
  }

  if (status === "unauthenticated" || session?.error === "RefreshAccessTokenError") {
    return null;
  }

  return <>{children}</>;
}
