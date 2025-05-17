<!-- O que esse componente faz?
      Esse componente trás a integração do VueCal com um sistema para gerenciar eventos diretamente do banco da supabase
      Tecnologias Utilizadas: VueCal, Supabase, TailwindCSS -->

<template>
  <div class="h-full w-full text-white flex flex-col">
    <!-- Barra de ações -->
    <div class="mb-4 px-4 py-2 bg-zinc-800 rounded-lg flex items-center justify-between shadow-md">
      <h2 class="text-lg font-semibold text-white">Calendário</h2>
      <div class="flex gap-2">
        <button
          @click="showManageModal = true"
          class="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg"
        >
          Gerenciar Eventos
        </button>
        <button
          @click="openModal"
          class="bg-[#8b5cf6] hover:bg-[#714ac8] text-white font-medium px-4 py-2 rounded-lg"
        >
          + Adicionar Evento
        </button>
      </div>
    </div>

    <VueCal
      class="vuecal--dark flex-1"
      default-view="month"
      :available-views="['month']"
      :time="false"
      :events="events"
      hide-title
      hide-view-selector
      @event-click="handleEventClick"
      style="min-height: 0;"
    />

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 w-80">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {{ selectedEvent ? 'Editar Evento' : 'Novo Evento' }}
        </h2>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Título</label>
          <input 
            v-model="newTitle" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:text-white bg-zinc-700 rounded-lg" 
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
          <textarea 
            v-model="newDescription" 
            rows="3" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:text-white bg-zinc-700 rounded-lg"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Data</label>
          <input 
            v-model="newDate" 
            type="date" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:text-white bg-zinc-700 rounded-md" 
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="closeModal" class="cancel-btn bg-gray-700 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg">Cancelar</button>
          <button @click="selectedEvent ? updateEvent() : saveEvent()" class="save-btn bg-[#8b5cf6] hover:bg-[#714ac8] text-white font-medium px-4 py-2 rounded-lg">
            {{ selectedEvent ? 'Atualizar' : 'Salvar' }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showManageModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-zinc-900 rounded-lg p-6 w-[90%] max-w-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Gerenciar Eventos</h2>
        <ul class="space-y-3 max-h-96 overflow-y-auto">
          <li
            v-for="event in events"
            :key="event.id"
            class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-start"
          >
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-white">{{ event.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ event.description }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Data: {{ event.start }}</p>
            </div>
            <div class="flex gap-2">
              <button @click="editEvent(event)" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg">
                Editar
              </button>
              <button @click="deleteEvent(event)" class="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg">
                Deletar
              </button>
            </div>
          </li>
        </ul>
        <div class="flex justify-end mt-4">
          <button @click="showManageModal = false" class="cancel-btn bg-gray-700 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg">Fechar</button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-zinc-900 rounded-lg p-6 w-80">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Confirmar Exclusão</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Tem certeza que deseja excluir o evento "{{ eventToDelete?.title }}"?
        </p>
        <div class="flex justify-end space-x-2">
          <button 
            @click="showDeleteModal = false" 
            class="cancel-btn bg-gray-700 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button 
            @click="confirmDelete" 
            class="delete-btn bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

const { $supabase } = useNuxtApp()
const events = ref([])
const showModal = ref(false)
const showManageModal = ref(false)
const showDeleteModal = ref(false)
const selectedEvent = ref(null)
const eventToDelete = ref(null)
const newTitle = ref('')
const newDescription = ref('')
const newDate = ref('')

async function loadEvents() {
  const { data, error } = await $supabase
    .from('eventos')
    .select('id, title, description, date')
    .order('date', { ascending: true })

  if (error) return console.error('Erro ao carregar eventos:', error)

  events.value = data.map(e => ({
    id: e.id,
    start: e.date,
    end: e.date,
    title: e.title,
    description: e.description
  }))
}

function openModal() {
  newTitle.value = ''
  newDescription.value = ''
  newDate.value = ''
  selectedEvent.value = null
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveEvent() {
  if (!newTitle.value || !newDate.value) return

  const { data, error } = await $supabase
    .from('eventos')
    .insert({ title: newTitle.value, description: newDescription.value, date: newDate.value })
    .select('id, title, description, date')
    .single()

  if (error) return console.error('Erro ao inserir evento:', error)

  events.value.push({
    id: data.id,
    start: data.date,
    end: data.date,
    title: data.title,
    description: data.description
  })

  closeModal()
}

async function updateEvent() {
  const { error } = await $supabase
    .from('eventos')
    .update({ title: newTitle.value, description: newDescription.value, date: newDate.value })
    .eq('id', selectedEvent.value.id)

  if (error) return console.error('Erro ao atualizar evento:', error)

  const index = events.value.findIndex(e => e.id === selectedEvent.value.id)
  if (index !== -1) {
    events.value[index] = {
      ...events.value[index],
      title: newTitle.value,
      description: newDescription.value,
      start: newDate.value,
      end: newDate.value
    }
  }

  selectedEvent.value = null
  closeModal()
}

function deleteEvent(event) {
  eventToDelete.value = event
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!eventToDelete.value) return
  
  const { error } = await $supabase
    .from('eventos')
    .delete()
    .eq('id', eventToDelete.value.id)
    
  if (error) {
    console.error('Erro ao deletar evento:', error)
  } else {
    events.value = events.value.filter(e => e.id !== eventToDelete.value.id)
  }
  
  showDeleteModal.value = false
  eventToDelete.value = null
}

function editEvent(event) {
  selectedEvent.value = event
  newTitle.value = event.title
  newDescription.value = event.description
  newDate.value = event.start
  showManageModal.value = false
  showModal.value = true
}

function handleEventClick({ event }) {
  alert(event.description ?? 'Sem descrição para este evento.')
}

onMounted(loadEvents)
</script>

<style scoped>
.vuecal {
  --vuecal-color-primary: #8b5cf6;
  font-family: "Inter", sans-serif;
  border-radius: 1rem;
}
.vuecal--dark {
  background-color: #18181b;
  color: #A14AFF;
  border-radius: 1rem;
}
:deep(.vuecal__day-name) {
  color: #A14AFF;
  font-weight: bold;
}
:deep(.vuecal__day) {
  background-color: #2D2D35;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
:deep(.vuecal__day:hover) {
  background-color: #8b5cf6;
  color: white;
}
:deep(.vuecal__event) {
  background-color: #A14AFF;
  border-radius: 8px;
  color: white;
  padding: 2px 6px;
}
:deep(.vuecal__details-wrapper),
:deep(.vuecal__details),
:deep(.vuecal__arrow),
:deep(.vuecal__view-selector),
:deep(.vuecal__selected-day),
:deep(.vuecal__active-day),
:deep(.vuecal__weekdays-headings),
:deep(.vuecal__column-header),
:deep(.vuecal__time-column),
:deep(.vuecal__column--details),
:deep(.vuecal__columns--has-details) {
  display: none !important;
}

.delete-btn {
  transition: background-color 0.2s ease;
}
</style>