import api from '@/lib/api'

export default {
  async getCustomers ({ commit, state, dispatch }, { page = 1, size = 10 }) {
    try {
      let payload = await api.getCustomers(page, size)
      return payload
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  },
  async createCustomer ({ dispatch }, data) {
    try {
      const { success, message } = await api.createCustomer(data)
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
  async customerUpdate ({ commit, dispatch, state }, data) {
    try {
      let { message } = await api.customerUpdate(data)
      dispatch('addTemporalNotification', { type: 'success', message: message })
      return true
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  },
  async getCustomerDetail ({ commit, state, dispatch }, { customerId }) {
    try {
      let payload = await api.getCustomerDetail(customerId)
      return payload
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  },
  async reviewOrderLimit ({ commit, state, dispatch }, customerId) {
    try {
      let payload = await api.reviewOrderLimit(customerId)
      return payload
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  },

  // =======Z=>==>=>=>=>=>==>=>=>
  async getUsers ({ commit, state, dispatch }, { page = 1, size = 10 }) {
    try {
      let payload = await api.getUsers(page, size)
      return payload
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  },

  async userUpdateStatus ({ commit, dispatch, state }, data) {
    try {
      const { message } = await api.userUpdateStatus(data)
      dispatch('addTemporalNotification', { type: 'success', message: message })
      return true
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'danger', message: error.message })
      return false
    }
  }
}
