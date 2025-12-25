import LoginRedirect from "./login-redirect";

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const defaultCallbackUrl = "/dashboard";

const normalizeCallbackUrl = (value?: string | string[]) => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) return defaultCallbackUrl;

  if (rawValue.startsWith("/")) {
    return rawValue;
  }

  const baseUrl = process.env.NEXTAUTH_URL;
  if (baseUrl && rawValue.startsWith(baseUrl)) {
    try {
      const url = new URL(rawValue);
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return defaultCallbackUrl;
    }
  }

  return defaultCallbackUrl;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const callbackUrl = normalizeCallbackUrl(searchParams?.callbackUrl);
  return <LoginRedirect callbackUrl={callbackUrl} />;
}
