// server/middleware/auth.js
import { createClient } from '@supabase/supabase-js'
import { parseCookies, createError, eventHandler } from 'h3'

export default eventHandler(async (event) => {
  const cookies = parseCookies(event)
  const token = cookies['sb-access-token']

  if (!token) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const supabase = createClient(
    process.env.NUXT_PUBLIC_SUPABASE_URL,
    process.env.NUXT_PUBLIC_SUPABASE_KEY
  )

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    throw createError({ statusCode: 401, message: 'Sessão inválida ou expirada' })
  }

  // Injeta o usuário no contexto da requisição
  event.context.user = data.user
})
