import { buildKeycloakResetPasswordUrl } from "@/lib/keycloak";

const getResetUrl = () => {
  const baseUrl = process.env.KEYCLOAK_BASE_URL;
  const realm = process.env.KEYCLOAK_REALM;
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const appUrl = process.env.NEXTAUTH_URL ?? "http://localhost:5173";
  const redirectUri = `${appUrl.replace(/\/$/, "")}/login`;

  if (!baseUrl || !realm || !clientId) {
    return null;
  }

  return buildKeycloakResetPasswordUrl({ baseUrl, realm, clientId, redirectUri });
};

export default function ForgotPasswordPage() {
  const resetUrl = getResetUrl();

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold">Reset your password</h1>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        We use Keycloak for password resets. You will be redirected to the secure reset page.
      </p>
      {resetUrl ? (
        <a
          className="mt-6 rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          href={resetUrl}
        >
          Continue to Keycloak
        </a>
      ) : (
        <p className="mt-6 text-sm text-red-600">
          Missing Keycloak configuration. Set KEYCLOAK_BASE_URL, KEYCLOAK_REALM, and
          KEYCLOAK_CLIENT_ID.
        </p>
      )}
      <a className="mt-4 text-xs text-zinc-500 underline" href="/login">
        Back to login
      </a>
    </main>
  );
}
