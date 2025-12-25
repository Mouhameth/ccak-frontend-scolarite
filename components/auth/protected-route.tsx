"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRouteInner({ children }: ProtectedRouteProps) {
  const sessionState = useSession();
  const session = sessionState?.data;
  const status = sessionState?.status ?? "loading";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "unauthenticated" || session?.error === "RefreshAccessTokenError") {
      const query = searchParams.toString();
      const safePath = pathname ?? "/";
      const callbackUrl = query ? `${safePath}?${query}` : safePath;
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

export default function ProtectedRoute(props: ProtectedRouteProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">
          Preparing your session…
        </div>
      }
    >
      <ProtectedRouteInner {...props} />
    </Suspense>
  );
}
