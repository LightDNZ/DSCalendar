// middleware/auth.js
import { createClient } from '@supabase/supabase-js'
import { parseCookies } from 'h3'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) return // Evita duplicidade no client

  const cookies = parseCookies(useRequestEvent())
  const token = cookies['sb-access-token']

  if (!token) {
    return navigateTo('/login')
  }

  const config = useRuntimeConfig()
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    return navigateTo('/login')
  }

  // aqui da para salvar o usuario para usa dps
})
