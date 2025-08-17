import {
  defineNuxtRouteMiddleware,
  useSupabaseClient,
  navigateTo,
} from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Páginas que não exigem login
  const publicPages = ["/", "/login", "/register"];

  if (publicPages.includes(to.path)) {
    return; // Permite o acesso a páginas públicas
  }

  const supabase = useSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !publicPages.includes(to.path)) {
    // Se não há usuário e a página é privada, redireciona para o login
    return navigateTo("/login");
  } else if (
    user &&
    (to.path === "/login" || to.path === "/register" || to.path === "/")
  ) {
    // Se há usuário e ele tenta acessar o login/cadastro/landing, redireciona para o app
    return navigateTo("/app");
  }
});
