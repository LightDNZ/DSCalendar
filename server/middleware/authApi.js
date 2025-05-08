// middleware/authApi.js
import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, createError, parseCookies } from 'h3'

export default defineEventHandler(async (event) => {
  // Protege somente rotas /api/notes
  const url = event.node.req.url || ''
  if (!url.startsWith('/api/notes')) {
    return  // libera outras APIs sem checar
  }

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
