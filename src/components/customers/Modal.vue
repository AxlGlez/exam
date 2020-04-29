<template>
  <div class="modal"  :class="{'is-active': active}">
    <div class="modal-background"></div>
    <form
      class="modal-card"
      @submit.prevent="onSubmit"
    >
    <header class="modal-card-head">
      <p class="modal-card-title has-text-centered">Agregar Usuario</p>
      <button class="delete" aria-label="close" type="reset" @click="close()"></button>
    </header>
    <section class="modal-card-body">
      <div class="columns is-multiline">
        <div class="column is-12 field">
          <label class="label">Nombre</label>
          <div class="control">
            <input
              required
              class="input"
              type="text"
              placeholder="Nombre"
              v-model="firstName"
            >
          </div>
        </div>
        <div class="column is-12 field">
          <label class="label">Primer Apellido</label>
          <div class="control">
            <input
              required
              class="input"
              type="text"
              placeholder="Primer apellido"
              v-model="lastName"
            >
          </div>
        </div>
        <div class="column is-12 field">
          <label class="label">Segundo Apellido</label>
          <div class="control">
            <input
              required
              class="input"
              type="text"
              placeholder="Segundo Apellido"
              v-model="mLastName"
            >
          </div>
        </div>
        <div class="column is-12 field">
          <label class="label">Correo Electrónico</label>
          <div class="control">
            <input
              required
              class="input"
              placeholder="E-mail"
              v-model="email"
              type="email"
            >
          </div>
        </div>
        <div class="column is-12 field">
          <label class="label">Edad</label>
          <div class="control">
            <input
              required
              class="input"
              placeholder="edad"
              v-model="age"
              type="number"
            >
          </div>
        </div>
      </div>
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
const regexNoLetters = /[^A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g
export default {
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
  watch: {
    firstName (newName) {
      let validText = newName.replace(regexNoLetters, '').replace('  ', ' ')
      if (validText === ' ') validText = ''
      this.firstName = validText
    },
    lastName (newName) {
      if (newName) {
        let validText = newName.replace(regexNoLetters, '').replace('  ', ' ')
        if (validText === ' ') validText = ''
        this.lastName = validText
      }
    },
    mLastName (newName) {
      if (newName) {
        let validText = newName.replace(regexNoLetters, '').replace('  ', ' ')
        if (validText === ' ') validText = ''
        this.mLastName = validText
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      const data = {
        name: this.firstName,
        last_name: this.lastName,
        second_last_name: this.mLastName,
        email: this.email,
        age: this.age
      }
      this.action(data)
      this.close()
      this.loading = false
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
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
