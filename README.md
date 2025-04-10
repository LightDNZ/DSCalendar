# 🗓️ DSCalendar

**DSCalendar** é um sistema de calendário e anotações escolares desenvolvido com **Nuxt 3** e **Supabase**. O objetivo é ajudar estudantes a organizarem sua rotina escolar com praticidade, colaborando com eventos e criando notas personalizadas.

---

## 🚀 Funcionalidades

- 📅 **Calendário interativo** com eventos em tempo real    
- 👨‍🎓 **Autenticação de usuários** (login/registro)  
- 🔧 **Edição colaborativa de eventos** (todos os usuários podem editar o calendário)  
- 🌙 **Modo escuro/claro**  
- 📦 Integração com **Supabase** (Auth + Database)  
- ⚡ Interface rápida com **Vue 3** e **FullCalendar**

---

## 🖼️ Demonstração

> Beta com falta de funcionalidades: [https://dscalendar.vercel.app](https://dscalendar.vercel.app)

---

## 🧱 Tecnologias usadas

| Stack        | Tecnologias                                          |
|--------------|-------------------------------------------------------|
| 💚 Frontend  | Nuxt 3, Vue 3, TailwindCSS, FullCalendar              |
| 🛠️ Backend   | Supabase (Database + Auth)                            |
| 🎨 Estilo    | Tailwind + UI personalizada                           |
| 🔒 Auth      | Nuxt Auth (via API)                                   |

---

## ⚙️ Instalação

1. **Clone o projeto:**

```bash
git clone https://github.com/LightDNZ/dscalendar.git
cd dscalendar
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o Supabase:**

Crie um arquivo `.env` com as credenciais:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=seu_anon_key
```

4. **Inicie o servidor:**

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)


---

## ✨ Destaques técnicos

- Eventos do calendário são atualizados em tempo real via Supabase  
- Interface leve e adaptada a dispositivos móveis  
- Integração manual com Supabase (sem módulo oficial)  

---

## 🧪 Funcionalidades futuras

- 🔔 Notificações automáticas de eventos próximos  
- 📱 PWA para uso offline  
- 👨‍🏫 Perfis de professores/alunos (roles)  
- 🔄 Modo admin (opcional no futuro)  
- 📊 Estatísticas de uso para usuários
- ✍️ Notas privadas salvas localmente com sincronização futura

---

