import { createClient } from '@supabase/supabase-js'
import validator from 'validator'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Usando a chave pública segura (anon key)
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  try {
    const body = await readBody(event)
    const { email, password } = body

    // Validação de email
    if (!validator.isEmail(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email invalido, use outro!',
      })
    }

    // Validação de senha
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message: 'Sua senha precisa ter no minimo 6 letras',
      })
    }

    // Criação do usuário via client-side API (signUp)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      if (error.message.includes('Usuário já registrado')) {
        throw createError({
          statusCode: 409,
          message: 'Uma conta com esse email já existe',
        })
      }

      throw createError({
        statusCode: 500,
        message: error.message,
      })
    }

    return { message: 'Usuário registrado com sucesso', user: data.user }

  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})
