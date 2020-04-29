<template>
  <section class="section">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <h1>Detalle del Usuario</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link class="button" to="/clientes">
            Regresar
          </router-link>
        </div>
      </div>
    </nav>
    <div class="columns is-multiline is-centered">
      <div class="column is-12">
        <customer-detail
          :detail="CustomerDetail"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetalleDelUsuario',
  components: {
    CustomerDetail: () => import('@/components/customers/CustomerDetail.vue')
  },
  data () {
    return {
      userId: this.$route.params.userId,
      CustomerDetail: {}
    }
  },
  beforeMount () {
    this.loading = true
    this.getUserDetail({ userId: this.userId })
      .then(resp => {
        this.CustomerDetail = resp.payload
      })
  },
  methods: {
    ...mapActions(['getUserDetail'])
  }
}
</script>

<style scoped>
  .section {
    width: 100%;
    padding: 0 20px 0 20px;
  }
</style>
