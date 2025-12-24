import ProtectedRoute from "@/components/auth/protected-route";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-16">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          You are authenticated with Keycloak. Start building the back office features here.
        </p>
      </main>
    </ProtectedRoute>
  );
}
