type KeycloakBase = {
  baseUrl: string;
  realm: string;
};

type KeycloakResetPasswordParams = KeycloakBase & {
  clientId: string;
  redirectUri: string;
};

type KeycloakLogoutParams = KeycloakBase & {
  idToken: string;
  redirectUri: string;
};

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const buildKeycloakIssuer = (baseUrl: string, realm: string) =>
  `${stripTrailingSlash(baseUrl)}/realms/${realm}`;

export const buildKeycloakTokenUrl = (baseUrl: string, realm: string) =>
  `${buildKeycloakIssuer(baseUrl, realm)}/protocol/openid-connect/token`;

export const buildKeycloakResetPasswordUrl = ({
  baseUrl,
  realm,
  clientId,
  redirectUri,
}: KeycloakResetPasswordParams) => {
  const url = new URL(`${buildKeycloakIssuer(baseUrl, realm)}/login-actions/reset-credentials`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  return url.toString();
};

export const buildKeycloakLogoutUrl = ({
  baseUrl,
  realm,
  idToken,
  redirectUri,
}: KeycloakLogoutParams) => {
  const url = new URL(`${buildKeycloakIssuer(baseUrl, realm)}/protocol/openid-connect/logout`);
  url.searchParams.set("id_token_hint", idToken);
  url.searchParams.set("post_logout_redirect_uri", redirectUri);
  return url.toString();
};
