<template>
  <section class="section">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <h1>Nueva orden</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link class="button is-danger is-outlined" to="/ordenes">
            Regresar
          </router-link>
        </div>
      </div>
    </nav>
    <div class="columns is-multiline is-centered">
      <div class="column is-12">
        <new
          :detail="CustomerDetail"
          :action="NewOrder"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewOrder',
  components: {
    New: () => import('@/components/orders/New.vue')
  },
  data () {
    return {
      customerId: this.$route.params.customerId,
      CustomerDetail: {}
    }
  },
  beforeMount () {
    this.loading = true
    this.getCustomerDetail({ customerId: this.customerId })
      .then(resp => {
        this.CustomerDetail = resp.payload
      })
  },
  methods: {
    ...mapActions(['getCustomerDetail', 'setNewOrder']),
    NewOrder (data) {
      let customerId = this.$route.params.customerId
      this.setNewOrder({ data, customerId })
        .then(resp => {
          if (resp.success) {
            this.$router.push('/ordenes')
          }
        })
    }
  }
}
</script>

<style scoped>
  .section {
    width: 100%;
    padding: 0 20px 0 20px;
  }
</style>
