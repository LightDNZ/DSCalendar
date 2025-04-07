<template>
  <div class="flex bg-zinc-900 h-screen">
    <!-- Sidebar original -->
    <div
      v-if="!showNotesSidebar"
      class="bg-black w-[338px] p-8 flex flex-col justify-between"
    >
      <!-- Topo -->
      <div>
        <Logo />
        <h1 class="text-white font-bold text-md mt-8">Calendário</h1>
        <p class="text-zinc-300 text-sm mt-0.5"></p>

        <!-- Data atual -->
        <button
          class="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white text-sm font-medium py-2 rounded-lg text-center cursor-pointer"
          @click="onDateClick"
        >
          {{ currentDate }}
        </button>

        <!-- Divisória -->
        <div class="mt-4 border-t border-zinc-700 w-full"></div>

        <!-- Botões -->
        <button
          @click="openNotesSidebar"
          class="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white text-sm font-medium py-2 rounded-lg"
        >
          Notas
        </button>
        <button
          class="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white text-sm font-medium py-2 rounded-lg"
        >
          Arquivos
        </button>
      </div>

      <!-- Perfil dropdown -->
      <div class="relative mt-6">
        <button
          @click="toggleDropdown"
          class="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-600 transition-colors"
        >
          <UserIcon class="h-5 w-5 text-white" />
        </button>

        <transition name="fade-up">
          <div
            v-if="showDropdown"
            class="absolute bottom-14 left-0 w-48 bg-zinc-800 rounded-lg shadow-xl py-2 z-50 animate-dropdown"
          >
            <a
              href="#"
              class="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
            >
              <UserIcon class="w-4 h-4" /> Perfil
            </a>
            <a
              href="#"
              class="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
            >
              <SettingsIcon class="w-4 h-4" /> Configurações
            </a>
            <div class="border-t border-zinc-700 my-2"></div>
            <button
              @click="logout"
              class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-700 transition-colors"
            >
              <LogOutIcon class="w-4 h-4" /> Sair
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- Sidebar de notas -->
    <div
      v-if="showNotesSidebar"
      class="bg-black w-[338px] h-screen p-8 flex flex-col justify-between"
    >
      <div>
        <Logo />

        <!-- Hoje -->
        <div>
          <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Hoje</p>
          <div class="ml-2">
            <div class="p-2 bg-[#6c18bf] rounded-lg">
              <h3 class="text-sm font-bold text-[#F4F4F5]">
                Projeto DSCalendar
              </h3>
              <div class="leading-snug">
                <span class="text-xs text-[#F4F4F5] mr-4">Hoje</span>
                <span class="text-xs text-[#C2C2C5]">DSCALENDAR</span>
              </div>
            </div>
            <div class="p-2">
              <h3 class="text-sm font-bold text-[#F4F4F5]">Terminei de ler</h3>
              <div class="leading-snug">
                <span class="text-xs text-[#F4F4F5] mr-4">Hoje</span>
                <span class="text-xs text-[#C2C2C5]">Codigo davinci</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ontem -->
        <div>
          <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Ontem</p>
          <div class="ml-2">
            <div class="p-2 rounded-lg">
              <h3 class="text-sm font-bold text-[#F4F4F5]">Projeto Codify</h3>
              <div class="leading-snug">
                <span class="text-xs text-[#F4F4F5] mr-4">Ontem</span>
                <span class="text-xs text-[#C2C2C5]">Dei commit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-auto">
          <button
            @click="closeNotesSidebar"
            class="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-600 transition-colors"
            title="Fechar notas"
          >
            <XIcon class="h-5 w-5 text-white" />
          </button>
        </div>
    </div>
    <!-- Calendário e conteúdo principal -->
    <div class="flex-1 h-screen">
      <!-- Quando a sidebar de notas está aberta -->
      <div
        v-if="showNotesSidebar"
        class="h-full p-8 overflow-auto bg-zinc-900 rounded-l-lg"
      >
        <div class="flex justify-between w-full items-start">
          <button
            class="inline-flex items-center text-sm text-[#C2C2C5] hover:text-white font-bold space-x-2"
          >
            <PencilIcon /><span>Criar nota</span>
          </button>
          <button>
            <TrashIcon class="text-[#6D6D73] hover:text-white" />
          </button>
        </div>
        <div class="max-w-[437px] mx-auto">
          <p class="text-[#929292] font-playfair">06 de Abril de 2025</p>
          <p class="text-[#D4D4D4] my-4 font-playfair">
            O DSCalendar é uma aplicação web desenvolvida para auxiliar
            estudantes na organização da rotina escolar. Ele combina
            funcionalidades de calendário e anotações, permitindo que os
            usuários visualizem datas importantes — como provas e trabalhos — e
            criem suas próprias notas personalizadas. O diferencial do
            DSCalendar é a possibilidade de edição colaborativa do calendário
            por todos os usuários, promovendo uma gestão mais participativa do
            ambiente escolar.
          </p>
          <p class="text-[#D4D4D4] my-4 font-playfair">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </div>
      </div>

      <!-- Quando a sidebar de notas está fechada (mostrar calendário) -->
      <div v-if="!showNotesSidebar" class="h-full overflow-hidden">
        <CalendarView v-if="showCalendar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "lucide-vue-next";
import CalendarView from "~/components/CalendarView.vue";

const showCalendar = ref(false);
const showNotesSidebar = ref(false);
const showDropdown = ref(false);

definePageMeta({
  middleware: ['auth']
})

const onDateClick = () => {
  showCalendar.value = !showCalendar.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const currentDate = ref(
  new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
);

const openNotesSidebar = () => {
  showNotesSidebar.value = true;
};

const closeNotesSidebar = () => {
  showNotesSidebar.value = false;
};

const router = useRouter();
const logout = async () => {
  try {
    await $fetch("/api/logout", { method: "POST" });

    Swal.fire({
      icon: "success",
      title: "Você saiu da sua conta",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => router.push("/login"), 1500);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erro ao sair",
      text: error?.data?.message || "Tente novamente.",
    });
  }
};
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.2s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
