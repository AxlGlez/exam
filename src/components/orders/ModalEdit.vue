<template>
  <div class="modal"  :class="{'is-active': active}">
    <div class="modal-background"></div>
    <form
      class="modal-card"
      @submit.prevent="onSubmit"
    >
    <header class="modal-card-head">
      <p class="modal-card-title has-text-centered">Editar orden</p>
      <button class="delete" aria-label="close" type="reset" @click="close()"></button>
    </header>
    <section class="modal-card-body">
      <new
          :detail="CustomerDetail"
          :action="NewOrder"
      />
    </section>
    <footer class="modal-card-foot">
      <button
        :disabled="loading"
        class="button is-danger"
        type="reset"
        @click="close"
      >
        Cancelar
      </button>
      <button
        class="button is-info"
        :class="{'is-loading': loading}"
        :disabled="loading"
        type="submit"
      >
        Agregar
      </button>
    </footer>
  </form>
</div>
</template>
<script>
export default {
  name: 'ModalEdit',
  components: {
    New: () => import('@/components/orders/New.vue')
  },
  props: {
    active: {
      type: Function,
      default: () => {}
    },
    close: {
      type: Function,
      default: () => {}
    },
    action: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      error: false,
      loading: false,
      firstName: '',
      lastName: '',
      mLastName: '',
      email: '',
      age: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .optional {
    font-size:10px;
  }
  .label:not(:last-child){
    font-size: 13px;
    color: #5f7081 !important;
  }
  .field:not(:last-child) {
    margin-bottom: 0rem;
  }
  .input, .textarea {
    font-size: 13px;
    padding: 1.25rem 0.75rem;
    color: #5f7081 !important;
  }
</style>
