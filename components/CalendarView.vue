<template>
  <div class="h-full w-full text-white">
    <VueCal
      style="height: 100%"
      default-view="month"
      :available-views="['month']"
      :time="false"
      :events="events"
      hide-title
      hide-view-selector
      :on-cell-click="handleDayClick"
      class="vuecal--dark"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

// Lista de eventos (exemplo)
const events = ref([
   { start: '2025-04-10', end: '2025-04-10', title: 'Prova de Matemática' },
]);

// Função para lidar com o clique no dia (não faz nada no momento)
function handleDayClick({ date }) {
  console.log(`Dia clicado: ${date}`);
}
</script>

<style scoped>
.vuecal {
  --vuecal-color-primary: #8b5cf6; /* Roxinho bonito */
  font-family: "Inter", sans-serif;
  border-radius: 1rem;
}

.vuecal--dark {
  background-color: #18181b;
  color: #A14AFF;
  border-radius: 1rem;
}

/* Estilo para os dias da semana */
:deep(.vuecal__day-name) {
  color: #A14AFF;
  font-weight: bold;
}

/* Estilo para as células do calendário */
:deep(.vuecal__day) {
  background-color: #2D2D35; /* Cor de fundo mais suave para as células */
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

:deep(.vuecal__day:hover) {
  background-color: #8b5cf6; /* Roxo ao passar o mouse */
  color: white;
}

/* Estilo para os eventos */
:deep(.vuecal__event) {
  background-color: #A14AFF;
  border-radius: 8px;
  color: white;
  padding: 2px 6px;
}

/* Esconde os botões de navegação de ano */
:deep(.vuecal__arrow.vuecal__arrow--prev),
:deep(.vuecal__arrow.vuecal__arrow--next) {
  display: none !important;
}

/* Esconde o seletor de view */
:deep(.vuecal__view-selector) {
  display: none !important;
}
</style>
