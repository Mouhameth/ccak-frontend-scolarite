export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400">
          CCAK • Back Office
        </div>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Welcome to the CCAK Back Office
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Manage academic services with confidence—student registration, grades, documents, and
          deliberations in one streamlined workspace.
        </p>
        <div className="mt-10 grid w-full gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold">Admissions & Enrollment</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Track registrations, validate records, and keep cohorts up to date.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold">Grades & Deliberations</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Review results, finalize deliberations, and publish outcomes.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold">Academic Documents</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Generate certificates, transcripts, and official letters securely.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold">Support & Oversight</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Monitor activity, audit updates, and keep operations compliant.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
