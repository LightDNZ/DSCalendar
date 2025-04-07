import { createClient } from '@supabase/supabase-js'
import { deleteCookie, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  try {
    // Recupera o token do cookie
    const token = getCookie(event, 'sb-access-token')

    if (token) {
      // Invalida a sessão no Supabase
      await supabase.auth.signOut()
    }

    // Deleta o cookie
    deleteCookie(event, 'sb-access-token', {
      path: '/',
    })

    return { message: 'Logout realizado com sucesso.' }

  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: 'Erro ao realizar logout.',
    })
  }
})
