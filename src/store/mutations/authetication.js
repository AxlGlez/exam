import router from '../../router'

export default {
  setAuthenticationValue (state, data) {
    state.authentication[data.name] = data.value
  },
  cleanSignin (state, data) {
    state.authentication.password = null
  },
  setAuthValues (state, payload) {
    state.authentication = payload
  },
  signOut (state) {
    state.authentication = {
      user: '',
      password: '',
      loading: false,
      token: ''
    }
    sessionStorage.removeItem('access-token')
    router.push({ name: 'login' })
  }
}
