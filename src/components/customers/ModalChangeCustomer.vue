<template>
<div class="modal"  :class="{'is-active': active}">
  <div class="modal-background"></div>
  <div class="modal-card">
      <header class="modal-card-head">
      <p class="modal-card-title has-text-centered">Clientes</p>
      <button class="delete" aria-label="close" type="reset" @click="close()"></button>
    </header>
     <section class="modal-card-body">
      <div class="columns is-multiline is-centered modal-card">
         <div class="field column is-4">
          <label class="label">Selecciona un cliente</label>
          <div class="select is-fullwidth">
            <select
              name="customerId"
              v-model="customerId"
              v-validate="'required'"
            >
              <option value="" disabled>Seleccione una opción</option>
                <template v-for="customer in customerList">
                  <option :value="customer.id" :key="customer.id">{{customer.name +' ' + customer.last_name + ' ' + customer.second_last_name}}</option>
                </template>
            </select>
          </div>
        </div>
      </div>
    </section>
   <footer class="modal-card-foot">
      <router-link
        :disabled="loading"
        class="button is-outlined"
        to="/clientes"
      >
        nuevo cliente
      </router-link>
      <router-link
        v-if="customerId && this.count.count < 3"
        class="button is-info"
        :class="{'is-loading': loading}"
        :to="`/ordenes/add/${customerId}`"
      >
        Seleccionar
      </router-link>
    </footer>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
const DEFAULT_DISPLAY_SIZE = 10

export default {
  props: {
    active: {
      type: Function,
      default: () => {}
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      error: false,
      loading: false,
      customerList: [],
      customerId: '',
      count: ''
    }
  },
  watch: {
    customerId (newValue) {
      this.reviewOrderLimit(newValue)
        .then(resp => {
          this.count = resp.payload.find(e => e.count)
          if (this.count.count >= 3) {
            this.addTemporalNotification({ type: 'danger', message: 'El cliente ya tiene 3 ordenes en el día' })
          }
        })
    }
  },
  beforeMount () {
    this.getCustomers({ page: 1, size: DEFAULT_DISPLAY_SIZE })
      .then(resp => {
        this.customerList = resp.users
        this.pages = resp.totalPages
      })
  },
  methods: {
    ...mapActions(['getCustomers', 'reviewOrderLimit', 'addTemporalNotification'])
  }
}
</script>
