<template>
  <section class='section'>
    <modal-customer
      v-if="chooseCustomer"
      :active="chooseCustomerActive"
      :close="chooseCustomerClose"
    />
    <modal-edit
      v-if="editOrder"
      :action="orderEdit"
      :close="changeEditOrder"
    />
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <h1>Ordenes</h1>
        </div>
      </div>
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control has-text-centered-mobile button" @click="chooseCustomerActive">
              Ordenar
              <i class="material-icons icon-action">add_shopping_cart</i>
          </div>
        </div>
      </div>
    </nav>
    <div class="columns is-multiline">
      <div class="column is-12">
        <base-table
          class="is-bordered is-striped is-narrow is-fullwidth is-hoverable bankingTable"
          :columns="columnsData"
          :data="orderList"
          :loading=loading
        >
        <div
          slot="config"
          slot-scope="scope"
        >
          <i class="material-icons icon-action" @click="changeEditOrder(scope.row.id)">edit</i>
          <i class="material-icons icon-danger" @click="orderDelet(scope.row)">delete</i>
        </div>
        </base-table>
      </div>
    </div>
    <base-pagination
      class="is-medium"
      :page="page"
      :pages="parseInt(pages)"
      :action="paginator"
      :loading="loading"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

const DEFAULT_DISPLAY_SIZE = 10

export default {
  name: 'Orders',
  components: {
    BaseTable: () => import('@/components/Table'),
    BasePagination: () => import('@/components/BasePagination'),
    ModalCustomer: () => import('@/components/customers/ModalChangeCustomer'),
    ModalEdit: () => import('@/components/orders/ModalEdit')
  },
  data () {
    return {
      page: 1,
      pages: '',
      loading: false,
      chooseCustomer: false,
      orderId: '',
      orderList: [],
      columnsData: [
        // { id: 'id',
        //   header: 'Id',
        //   class: 'column-mobile'
        // },
        { id: 'name',
          header: 'Cliente',
          class: 'column-mobile'
        },
        { id: 'descripcion',
          header: 'Pedidos',
          class: 'column-mobile',
          accessor: (row) => `Entradas:${row.entradas} Guisados:${row.guisados} Postres:${row.postres} Bebidas:${row.bebidas}`
        },
        {
          id: 'created_at',
          header: 'Fecha de creación',
          class: 'column-mobile is-hidden-touch',
          accessor: (row) => moment(row.created_at).format('DD-MM-YYYY')
        },
        { id: 'config', name: 'config', header: 'Acciones', class: 'column-mobile has-text-centered' }
      ],
      editOrder: false
    }
  },
  methods: {
    ...mapActions(['getOrdersList', 'setDeleteOrder', 'setEditOrder']),
    chooseCustomerActive () {
      this.chooseCustomer = true
    },
    chooseCustomerClose () {
      this.chooseCustomer = false
    },
    paginator (page) {
      this.page = page
      this.loading = true
      this.getOrdersList({ page })
        .then(resp => {
          this.orderList = resp.orders
          this.pages = resp.totalPages
          this.loading = false
        })
    },
    changeEditOrder (orderId) {
      this.orderId = orderId
      this.editOrder = !this.editOrder
    },
    orderDelet (data) {
      let dataDelete = { customerId: data.customer_id, id: data.id }
      this.setDeleteOrder(dataDelete)
        .then(resp => {
          if (resp) {
            this.getOrdersList({ page: this.page, size: DEFAULT_DISPLAY_SIZE })
              .then(resp => {
                this.orderList = resp.orders
                this.pages = resp.totalPages
                this.loading = false
              })
          }
        })
    },
    orderEdit (data) {
      this.setEditOrder({ data, orderId: this.orderId })
        .then(resp => {
          if (resp) {
            this.getOrdersList({ page: this.page, size: DEFAULT_DISPLAY_SIZE })
              .then(resp => {
                this.orderList = resp.orders
                this.pages = resp.totalPages
                this.loading = false
              })
            this.editOrder = !this.editOrder
          }
        })
    }
  },
  beforeMount () {
    this.loading = true
    this.getOrdersList({ page: this.page, size: DEFAULT_DISPLAY_SIZE })
      .then(resp => {
        this.orderList = resp.orders
        this.pages = resp.totalPages
        this.loading = false
      })
  }
}
</script>
<style scoped>
  .section {
    width: 100%;
    padding: 0 20px 0 20px;
  }
  .icon-action {
    cursor: pointer;
    color: #039DA1;
  }
  .icon-danger {
    cursor: pointer;
    color: red;
  }
</style>
