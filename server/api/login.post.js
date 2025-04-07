// server/api/login.post.js

import { createClient } from '@supabase/supabase-js'
import validator from 'validator'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!validator.isEmail(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email inválido',
      })
    }

    if (!password || password.length < 6) {
      throw createError({
        statusCode: 400,
        message: 'Senha muito curta',
      })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      throw createError({
        statusCode: 401,
        message: error?.message || 'Credenciais inválidas',
      })
    }

    // Salva o token em cookie HTTP-only
    setCookie(event, 'sb-access-token', data.session.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return { message: 'Login bem-sucedido', user: data.user }

  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno no login',
    })
  }
})
