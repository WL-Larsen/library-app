export const OktaConfig = {
    clientId: "0oaimqywceb8P74y75d7",
    issuer: "https://dev-27978654.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
}