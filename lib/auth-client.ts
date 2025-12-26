"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import { buildKeycloakLogoutUrl } from "@/lib/keycloak";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const login = useCallback((callbackUrl?: string) => {
    return signIn("keycloak", { callbackUrl: callbackUrl ?? "/dashboard" });
  }, []);

  const logout = useCallback(async () => {
    await signOut({ redirect: false });

    const baseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL;
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;

    if (baseUrl && realm && session?.idToken) {
      const redirectUri = `${window.location.origin}/login`;
      window.location.href = buildKeycloakLogoutUrl({
        baseUrl,
        realm,
        idToken: session.idToken,
        redirectUri,
      });
      return;
    }

    window.location.href = "/login";
  }, [session]);

  return { session, status, login, logout };
};
