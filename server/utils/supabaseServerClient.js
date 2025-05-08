import { createClient } from '@supabase/supabase-js'
import { getCookie } from 'h3'

export function createSupabaseServerClient(event) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'sb-access-token')

  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    token
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      : undefined
  )
}

// Essa função é usada para criar um cliente do Supabase no lado do servidor, permitindo que você faça chamadas à API do Supabase com o token de autenticação do usuário, se disponível. 
// Isso é útil para operações que requerem autenticação, como acessar dados protegidos ou realizar ações em nome do usuário autenticado.