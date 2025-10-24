export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useCookie('auth');
  if (!auth.value) {
    return navigateTo('/login');
  }
});
