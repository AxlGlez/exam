import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (window.innerWidth <= 1024 && store.state.ui.sidebar) {
    store.commit('toggleSidebar')
  }
  const requiresAuth = to.matched.some(route => route.meta.auth)
  const authed = sessionStorage.getItem('access-token')
  const signInObject = { name: 'login', query: { redirect: to.fullPath } }

  if (requiresAuth && !authed) next(signInObject)

  if (to.name === 'login') return next()
  store.dispatch('validateSession')
    .then(response => {
      return next()
    })
    .catch(() => {
      sessionStorage.removeItem('access-token')
      next({ name: 'login' })
    })
})

export default router
