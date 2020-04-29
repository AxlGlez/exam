import api from '@/lib/api'
import router from '@/router'

export default {
  async signin ({ commit, dispatch, state }, dataAdmin) {
    try {
      let { token, success, message = null } = await api.loginAdmin(dataAdmin)
      if (!success) throw new Error(message)
      sessionStorage.setItem('access-token', token)
      router.replace({ name: 'first-view' })
      return success
    } catch (error) {
      console.log(error)
      dispatch('addTemporalNotification', {
        type: 'danger',
        message: 'Credenciales inválidas'
      })
      return false
    }
  },

  async validateSession ({ commit, state, dispatch }) {
    try {
      const response = await api.validateSession()
      commit('setAuthValues', { ...response })
      return { complete: true, payload: response }
    } catch (error) {
      dispatch('addTemporalNotification', { type: 'error', message: error.message })
      return { complete: false, message: error.message }
    }
  }
}
