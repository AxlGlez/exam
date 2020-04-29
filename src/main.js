import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VeeValidate, {
  errorBagName: 'vverrors',
  fieldsBagName: 'vvfields',
  events: 'change|blur'
})
Validator.localize('es', es)
