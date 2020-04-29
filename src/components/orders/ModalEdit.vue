<template>
  <div class="modal"  :class="{'is-active': active}">
    <div class="modal-background"></div>
    <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-centered">Editar orden</p>
      <button class="delete" aria-label="close" type="reset" @click="close()"></button>
    </header>
    <section class="modal-card-body">
      <Menu
        :action="action"
      />
    </section>
  </div>
</div>
</template>
<script>
export default {
  name: 'ModalEdit',
  components: {
    Menu: () => import('@/components/orders/Menu.vue')
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
  }
}
</script>
