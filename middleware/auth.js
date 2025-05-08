// middleware/auth.js
import { parseCookies } from 'h3'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return // Evita duplicidade no client

  const cookies = parseCookies(useRequestEvent())
  const token = cookies['sb-access-token']

  if (!token) {
    return navigateTo('/login')
  }

  const { $supabase } = useNuxtApp() // Alterei essa parte no middleware para evitar a redundância de criar varios clients para cada requisição

  const { data, error } = await $supabase.auth.getUser(token)

  if (error || !data?.user) {
    return navigateTo('/login')
  }

  // Aqui da para salvar o usuario para usar depois
})
