<template>
  <section>
    <div class="columns">
      <div class="column is-3">
        <p class="label">Entradas</p>
        <div class="columns is-multiline">
          <template v-for="(item, index) in entradas.entradas">
            <div class="field column is-12" :key="index">
              <label class="checkbox">
                <input type="checkbox" v-model="entradasId" :value="item.description">
                  {{item.id}}. {{item.description}}
              </label>
            </div>
          </template>
        </div>
      </div>
      <div class="column is-3">
        <p class="label">Guisados</p>
        <div class="columns is-multiline">
          <template v-for="(item, index) in entradas.guisados">
            <div class="field column is-12" :key="index">
              <label class="checkbox">
                <input type="checkbox" v-model="guisadosId" :value="item.description">
                  {{item.id}}. {{item.description}}
              </label>
            </div>
          </template>
        </div>
      </div>
      <div class="column is-3">
        <p class="label">Postres</p>
        <div class="columns is-multiline">
          <template v-for="(item, index) in entradas.postres">
            <div class="field column is-12" :key="index">
              <label class="checkbox">
                <input type="checkbox" v-model="postresId" :value="item.description">
                  {{item.id}}. {{item.description}}
              </label>
            </div>
          </template>
        </div>
      </div>
      <div class="column is-3">
        <p class="label">Bebidas</p>
        <div class="columns is-multiline">
          <template v-for="(item, index) in entradas.bebidas">
            <div class="field column is-12" :key="index">
              <label class="checkbox">
                <input type="checkbox" v-model="bebidasId" :value="item.description">
                  {{item.id}}. {{item.description}}
              </label>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="column is-offset-9 is-3">
      <button
        class="button is-info"
        @click="newOrder"
      >
        Guardar
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { listMenu } from '@/constants/menu'

export default {
  name: 'Menu',
  props: {
    action: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      listMenu,
      entradasId: [],
      guisadosId: [],
      postresId: [],
      bebidasId: [],
      entradas: [],
      guisados: [],
      postres: [],
      bebidas: []
    }
  },
  beforeMount () {
    this.entradas = this.listMenu.find(e => e.entradas)
    this.guisados = this.listMenu.find(e => e.guisados)
    this.postres = this.listMenu.find(e => e.postres)
    this.bebidas = this.listMenu.find(e => e.bebidas)
  },
  methods: {
    ...mapActions(['addTemporalNotification']),
    newOrder () {
      this.loading = true
      if (this.entradasId.length !== 0 || this.guisadosId.length !== 0 || this.postresId.length !== 0 || this.bebidasId.length !== 0) {
        let data = {
          entradas: this.entradasId,
          guisados: this.guisadosId,
          postres: this.postresId,
          bebidas: this.bebidasId
        }
        this.action(data)
      } else {
        this.addTemporalNotification({ type: 'danger', message: 'Es necesario escoger algun alimento' })
        this.loading = false
      }
    }
  }
}
</script>
