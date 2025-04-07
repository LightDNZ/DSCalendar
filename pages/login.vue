<template>
    <div class="flex bg-zinc-900 h-screen">
      <!-- sidebar -->
      <div class="bg-black w-[516px] p-12 flex flex-col justify-center">
        <Logo />
        <h1 class="text-white font-bold text-lg mt-8">
          Entre na sua conta
        </h1>
        <p class="text-zinc-300 text-sm mt-0.5">
          Não tem uma conta?
          <nuxt-link to="/registro" class="font-bold text-[#A14AFF] underline"
            >Crie uma</nuxt-link
          >
          nova
        </p>
  
        <form @submit.prevent="submit">
          <div class="mt-8">
            <label for="" class="text-zinc-300 text-sm block mb-0.5"
              >Email</label
            >
            <input
              v-model="email"
              placeholder="gabriel@dscalendar.com"
              type="email"
              class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
            />
          </div>
  
          <div class="mt-6">
            <label for="" class="text-zinc-300 text-sm block mb-0.5"
              >Senha</label
            >
            <input
              v-model="password"
              placeholder="****************"
              type="password"
              class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white px-4 py-2 placeholder:text-zinc-500 text-sm"
            />
          </div>
  
          <!-- botao login -->
          <div>
            <button
              class="w-full mt-4 bg-[#A14AFF] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2"
            >
              <span>Login</span>
              <ArrowRight />
            </button>
          </div>
          <!-- /botao login -->
        </form>
      </div>
      <!-- /sidebar -->
      <!-- itnro -->
      <div>   </div>
      <!-- /intro -->
    </div>
  </template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const email = ref('')
const password = ref('')
const router = useRouter()

const submit = async () => {
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    Swal.fire({
      icon: 'success',
      title: 'Login realizado com sucesso!',
      text: 'Você será redirecionado.',
      timer: 3000,
      showConfirmButton: false,
    })

    setTimeout(() => {
      router.push('/') 
    }, 3000)

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro ao fazer login',
      text: error?.data?.message || 'Tente novamente mais tarde.',
    })
  }
}
</script>
