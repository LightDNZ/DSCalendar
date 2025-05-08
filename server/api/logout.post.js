import { deleteCookie, getCookie } from 'h3'
import { createSupabaseServerClient } from '~/server/utils/supabaseServerClient'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'sb-access-token')
  const supabase = createSupabaseServerClient(event)

  try {
    if (token) {
      await supabase.auth.signOut()
    }

    deleteCookie(event, 'sb-access-token', { path: '/' })

    return { message: 'Logout realizado com sucesso.' }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: 'Erro ao realizar logout.'
    })
  }
})
