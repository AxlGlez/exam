<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <form
      class="modal-card"
      @submit.prevent="saveData"
    >
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">Editar cliente</p>
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
                :class="{ 'is-danger': vverrors.first('nameUpdate') }"
                type="text"
                placeholder="Nombre"
                name="nameUpdate"
                v-model="nameUpdate"
                v-validate="'required'"
              >
            </div>
          </div>
          <div class="column is-12 field">
            <label class="label">Apellido Paterno</label>
            <div class="control">
              <input
                required
                class="input"
                :class="{ 'is-danger': vverrors.first('lastNameUpdate') }"
                type="text"
                placeholder="Apellido Paterno"
                name="lastNameUpdate"
                v-model="lastNameUpdate"
                v-validate="'required'"
              >
            </div>
          </div>
          <div class="column is-12 field">
            <label class="label">Apellido Materno</label>
            <div class="control">
              <input
                required
                class="input"
                :class="{ 'is-danger': vverrors.first('secondLastNameUpdate') }"
                type="text"
                placeholder="Apellido Materno"
                name="secondLastNameUpdate"
                v-model="secondLastNameUpdate"
                v-validate="'required'"
              >
            </div>
          </div>
          <div class="column is-12 field">
            <label class="label">Correo electrónico</label>
            <div class="control">
              <input
                required
                class="input"
                :class="{ 'is-danger': vverrors.first('emailUpdate') }"
                type="mail"
                placeholder="Correo electrónico"
                name="email"
                v-model="emailUpdate"
                v-validate="'required'"
              >
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          type="reset"
          @click="close"
        >
          Cancelar
        </button>
        <button
          class="button is-info"
          type="submit">
          Guardar
        </button>
      </footer>
    </form>
</div>
</template>
<script>
const regexNoLetters = /[^A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g

export default {
  name: 'modalEditAdministrator',
  props: {
    action: {
      type: Function,
      default: () => {}
    },
    close: {
      type: Function,
      default: () => {}
    },
    name: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    secondLastName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      nameUpdate: '',
      lastNameUpdate: '',
      secondLastNameUpdate: '',
      emailUpdate: ''
    }
  },
  beforeMount () {
    this.nameUpdate = this.name
    this.lastNameUpdate = this.lastName
    this.secondLastNameUpdate = this.secondLastName
    this.emailUpdate = this.email
  },
  watch: {
    nameUpdate (newName) {
      let validText = newName.replace(regexNoLetters, '').replace('  ', ' ')
      if (validText === ' ') validText = ''
      this.nameUpdate = validText
    },
    lastNameUpdate (newlastName) {
      let validText = newlastName.replace(regexNoLetters, '').replace('  ', ' ')
      if (validText === ' ') validText = ''
      this.lastNameUpdate = validText
    },
    secondLastNameUpdate (newsecondLastName) {
      let validText = newsecondLastName.replace(regexNoLetters, '').replace('  ', ' ')
      if (validText === ' ') validText = ''
      this.secondLastNameUpdate = validText
    }
  },
  methods: {
    async saveData () {
      if (await this.$validator.validateAll()) {
        let data = {
          name: this.nameUpdate,
          lastName: this.lastNameUpdate,
          secondLastName: this.secondLastNameUpdate,
          email: this.emailUpdate
        }
        this.action(data)
      }
    }
  }
}
</script>

<style scoped>
  .optional {
    font-size:10px;
  }
</style>
