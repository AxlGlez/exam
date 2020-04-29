import api from '@/lib/api'

export default {
  async setNewOrder ({ dispatch }, { data, customerId }) {
    try {
      const { success, message } = await api.setNewOrder({ data, customerId })
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
  },
  async getOrdersList ({ commit, state, dispatch }, { page = 1, size = 10 }) {
    try {
      let payload = await api.getOrdersList(page, size)
      return payload
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  },
  async setDeleteOrder ({ dispatch }, dataDelete) {
    try {
      const { success, message } = await api.setDeleteOrder(dataDelete)
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
  },
  async setEditOrder ({ dispatch }, { data, orderId }) {
    try {
      const { success, message } = await api.setEditOrder({ data, orderId })
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
