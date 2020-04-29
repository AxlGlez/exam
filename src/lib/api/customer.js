const API_URL = process.env.VUE_APP_API_URL
const getToken = () => sessionStorage.getItem('access-token')

export default {
  async getCustomers (page = 1, size = 10) {
    const response = await fetch(`${API_URL}/admin/customers?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      }
    })

    let resp = await response.json()
    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        throw new Error(resp.error)
      }
    }
    return resp
  },
  async createCustomer (data) {
    const response = await fetch(`${API_URL}/admin/add/customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('access-token')
      },
      body: JSON.stringify(data)
    })

    let resp = await response.json()
    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        return Promise.reject(new Error(resp.error))
      }
    }
    return resp
  },
  async customerUpdate (data) {
    let { id, ...dataUpdate } = data
    const response = await fetch(`${API_URL}/admin/customer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('access-token')
      },
      body: JSON.stringify(dataUpdate)
    })
    let resp = await response.json()

    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        throw new Error(resp.error)
      }
    }
    return resp
  },
  async getCustomerDetail (customerId) {
    const response = await fetch(`${API_URL}/admin/customer/${customerId}/detail`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      }
    })

    let resp = await response.json()

    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        throw new Error(resp.error)
      }
    }
    return resp
  },
  async reviewOrderLimit (customerId) {
    const response = await fetch(`${API_URL}/admin/customer/reviewOrder/${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      }
    })

    let resp = await response.json()

    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        throw new Error(resp.error)
      }
    }
    return resp
  },

  // --------=======>>>>>>>>
  async getUsers (page = 1, size = 10) {
    const response = await fetch(`${API_URL}/admin/customer/user?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      }
    })

    let resp = await response.json()

    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        throw new Error(resp.error)
      }
    }
    return resp
  },

  async userUpdateStatus (data) {
    const { userId, ...dataActive } = data
    const response = await fetch(`${API_URL}/admin/customer/${userId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('access-token')
      },
      body: JSON.stringify(dataActive)
    })

    let resp = await response.json()

    if (!response.ok) {
      this.isLoading = false
      if (response.status === 400) {
        throw new Error(resp.error)
      }
    }
    return resp
  }
}
