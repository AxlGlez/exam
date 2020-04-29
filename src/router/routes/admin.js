export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    redirect: 'dashboard',
    meta: { auth: true },
    children: [
      {
        path: '/',
        name: 'first-view',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'ordenes',
        name: 'ordenes',
        component: () => import('@/views/ordenes/Orders.vue')
      },
      {
        path: 'ordenes/add/:customerId',
        name: 'nueva-orden',
        component: () => import('@/views/ordenes/NewOrder.vue')
      },
      {
        path: 'clientes',
        name: 'clientes',
        component: () => import('@/views/clientes/Customer.vue')
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/menu/Menu.vue')
      }
    ]
  }
]
