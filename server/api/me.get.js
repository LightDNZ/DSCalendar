import auth from '~/middleware/auth'

export default defineEventHandler(async (event) => {
  await auth(event)

  return {
    user: event.context.user,
  }
})