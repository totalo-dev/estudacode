/** Cookie mock de sessão — substituir quando Supabase Auth estiver ativo */
export const AUTH_COOKIE = "estudacode-token";

/** Remove o cookie de autenticação e redireciona (apenas no browser). */
export function logout(redirectTo = "/login") {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
  window.location.href = redirectTo;
}
