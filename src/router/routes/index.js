import admin from './admin'
import auth from './auth'

export default [
  ...admin,
  ...auth,
  { path: '*', component: () => import('@/views/ErrorPage.vue') }
]
