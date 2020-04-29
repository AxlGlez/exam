const API_URL = process.env.VUE_APP_API_URL
const getToken = () => sessionStorage.getItem('access-token')

export default {
  async setNewOrder ({ data, customerId }) {
    const response = await fetch(`${API_URL}/admin/add/order/${customerId}`, {
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
  async getOrdersList (page = 1, size = 10) {
    const response = await fetch(`${API_URL}/admin/orders?page=${page}&size=${size}`, {
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
  async setDeleteOrder (dataDelete) {
    const response = await fetch(`${API_URL}/admin/delete/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('access-token')
      },
      body: JSON.stringify(dataDelete)
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
  async setEditOrder ({ data, orderId }) {
    const response = await fetch(`${API_URL}/admin/edit/order/${orderId}`, {
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
  }
}
