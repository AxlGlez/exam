<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <div class="box">
        <div class="columns is-multiline">
          <div class="column is-12">
            <!-- <h2 class="subtitle has-text-centered">
              Orden
            </h2> -->
          </div>
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
          <div class="column is-12 has-text-right">
            <button
              @click="newOrder"
              class="button is-link"
              :class="{'is-loading': loading}"
            >
              Generar orden
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'New',
  props: {
    detail: {
      type: Object,
      required: true
    },
    action: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      compledMenu: false,
      listMenu: [ {
        entradas: [
          {
            id: 1,
            description: 'sopa de algo'
          },
          {
            id: 2,
            description: 'sopa de otra cosa'
          },
          {
            id: 3,
            description: 'mas sopa'
          }
        ],
        guisados: [
          {
            id: 1,
            description: 'Tacos'
          },
          {
            id: 2,
            description: 'Tortas'
          },
          {
            id: 3,
            description: 'Tamal'
          }
        ],
        postres: [
          {
            id: 1,
            description: 'gelatina'
          },
          {
            id: 2,
            description: 'pan'
          }
        ],
        bebidas: [
          {
            id: 1,
            description: 'Agua'
          },
          {
            id: 2,
            description: 'Refresco'
          },
          {
            id: 3,
            description: 'Cerveza'
          }
        ]
      }],
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
        this.loading = false
        this.entradasId = []
        this.guisadosId = []
        this.postresId = []
        this.bebidasId = []
        this.$router.replace('/ordenes')
      } else {
        this.addTemporalNotification({ type: 'danger', message: 'Es necesario escoger algun alimento' })
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>
