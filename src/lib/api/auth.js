const API_URL = process.env.VUE_APP_API_URL
const getToken = () => sessionStorage.getItem('access-token')

export default {
  async loginAdmin ({ email, password }) {
    const response = await fetch(`${API_URL}/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if (response.ok) {
      return response.json()
    } else if (response.status === 400) {
      return Promise.reject(new Error(`ha ocurrido un error, contacté al administrador.`))
    } else {
      return Promise.reject(new Error('Request Error'))
    }
  },
  async validateSession () {
    const response = await fetch(`${API_URL}/admin/auth/validate-session`, {
      headers: {
        authorization: getToken()
      }
    })
    if (response.ok) {
      return response.json()
    } else if (response.status === 400) {
      return Promise.reject(new Error('Su sesión ha expirado'))
    } else {
      return Promise.reject(new Error('Request Error'))
    }
  }
}
