import api from '@/lib/api'

export default {
  async getOrdersList ({ dispatch }, data) {
    try {
      const { success, message } = await api.createUserAdmin(data)
      if (success) {
        return success
      } else {
        dispatch('addTemporalNotification', { type: 'danger', message })
        return false
      }
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  }
}
