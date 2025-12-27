"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import NotificationPopup from "@/components/notifications/NotificationPopup";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-16">

        {/* En-tête avec le Titre et la Cloche */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          {/* C'est ici qu'on appelle ton composant ! */}
          <NotificationPopup />
        </div>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You are authenticated with Keycloak. Start building the back office features here.
        </p>

      </main>
    </ProtectedRoute>
  );
}