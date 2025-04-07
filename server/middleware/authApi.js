// middleware/authApi.js
import { createClient } from '@supabase/supabase-js'
import { parseCookies, createError, eventHandler } from 'h3'

export default eventHandler(async (event) => {
  // Protege apenas rotas que começam com /api/notes
  if (!event.path.startsWith('/api/notes')) return

  const cookies = parseCookies(event)
  const token = cookies['sb-access-token']

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Não autenticado (token ausente)',
    })
  }

  const supabase = createClient(
    process.env.NUXT_PUBLIC_SUPABASE_URL,
    process.env.NUXT_PUBLIC_SUPABASE_KEY
  )

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    throw createError({
      statusCode: 401,
      message: 'Sessão inválida ou expirada',
    })
  }

  // Usuário válido, armazena para uso nos endpoints
  event.context.user = data.user
})
