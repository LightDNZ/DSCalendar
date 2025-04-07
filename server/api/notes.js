// /api/notes - retorna as notas dos usuarios

import { createClient } from '@supabase/supabase-js'
import auth from '../middleware/authApi'

export default defineEventHandler(async (event) => {
  await auth(event)
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Usuário não autenticado',
    })
  }

  // só é seguro usar a anon key pelas politicas de RLS do supabase
  // No caso de não ter politicas configuradas -> use a service role no lugar da anon key
  const supabase = createClient(
    process.env.NUXT_PUBLIC_SUPABASE_URL,
    process.env.NUXT_PUBLIC_SUPABASE_KEY
  )

  // Busca apenas as notas do usuário autenticado
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
  
  return notes
})
