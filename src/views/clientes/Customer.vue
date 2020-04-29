<template>
  <section class='section'>
    <modalAddCustomer
      v-if="addUserModal"
      :active="showAddUserModal"
      :action="createUserAdminLocal"
      :close="closeAddUserModal"
    />
    <ModalEditCustomer
      v-if="modalEditCustomer"
      :action="editActive"
      :close="closeEdit"
      :name="nameCustomer"
      :lastName="lastNameCustomer"
      :secondLastName="secondLastName"
      :email="emailCustomer"
    />
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <h1>Clientes</h1>
        </div>
      </div>
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control has-text-centered-mobile">
             <div
              class="button has-text-centered-mobile is-info is-outlined"
              @click="showAddUserModal"
            >
              Agregar Cliente
              <i class="material-icons icon-action">person_add</i>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="columns is-multiline">
      <div class="column is-12">
        <base-table
          class="is-bordered is-striped is-narrow is-fullwidth is-hoverable bankingTable"
          :columns="columnsData"
          :data="adminList"
          :loading=loading
        >
        <div
          slot="config"
          slot-scope="scope"
        >
          <i class="material-icons icon-action" @click="reviewCustomer(scope.row.id)">add_shopping_cart</i>
          <i class="material-icons icon-action" @click="openEditCustomer(scope.row)">edit</i>
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
  name: 'Customer',
  components: {
    BaseTable: () => import('@/components/Table'),
    BasePagination: () => import('@/components/BasePagination'),
    modalAddCustomer: () => import('@/components/customers/Modal'),
    ModalEditCustomer: () => import('@/components/customers/ModalEditCustomer.vue')
  },
  data () {
    return {
      addUserModal: false,
      modalEditCustomer: false,
      page: 1,
      pages: '',
      loading: false,
      adminList: [],
      columnsData: [
        { id: 'name',
          header: 'Nombre',
          class: 'column-mobile has-text-centered',
          accessor: (row) => `${row.name} ${row.last_name} ${row.second_last_name}`
        },
        { id: 'email', header: 'E-mail', class: 'column-mobile has-text-centered' },
        { id: 'age', header: 'Edad', class: 'column-mobile has-text-centered' },
        {
          id: 'created_at',
          header: 'Fecha de Registro',
          class: 'column-mobile is-hidden-touch has-text-centered',
          accessor: (row) => moment(row.created_at).format('DD-MM-YYYY')
        },
        { id: 'config', name: 'config', header: 'Acciones', class: 'column-mobile has-text-centered' }
      ],
      idCustomer: 0,
      statusAdmin: false,
      nameCustomer: null,
      lastNameCustomer: null,
      secondLastName: null,
      email: null
    }
  },
  methods: {
    ...mapActions(['getCustomers', 'createCustomer', 'customerUpdate', 'reviewOrderLimit', 'addTemporalNotification']),
    editActive (data) {
      let dataUpdate = {
        ...data,
        id: this.idCustomer
      }
      this.customerUpdate(dataUpdate)
        .then((resp) => {
          if (resp) {
            this.getCustomers({ page: 1, size: DEFAULT_DISPLAY_SIZE })
              .then(resp => {
                this.adminList = resp.users
                this.pages = resp.totalPages
              })
            this.modalEditCustomer = false
          }
          this.loading = false
        })
    },
    reviewCustomer (data) {
      this.reviewOrderLimit(data)
        .then(resp => {
          this.count = resp.payload.find(e => e.count)
          if (this.count.count >= 3) {
            this.addTemporalNotification({ type: 'danger', message: 'El cliente ya tiene 3 ordenes en el día' })
          } else {
            this.$router.push(`/ordenes/add/${data}`)
          }
        })
    },
    paginator (page) {
      this.page = page
      this.loading = true
      this.getCustomers({ page })
        .then(resp => {
          this.loading = false
          this.adminList = resp.users
          this.pages = resp.totalPages
        })
    },
    showAddUserModal () {
      this.addUserModal = true
    },
    closeAddUserModal () {
      this.addUserModal = false
    },
    openEditCustomer (data) {
      this.idCustomer = data.id
      this.emailCustomer = data.email
      this.nameCustomer = data.name
      this.lastNameCustomer = data.last_name
      this.secondLastName = data.second_last_name
      this.modalEditCustomer = true
    },
    closeEdit () {
      this.modalEditCustomer = false
    },
    async createUserAdminLocal (data) {
      let newUser = await this.createCustomer(data)
      if (newUser) {
        let adminList = await this.getCustomers({ page: 1, size: DEFAULT_DISPLAY_SIZE })
        this.adminList = adminList.users
        this.pages = adminList.totalPages
        this.addUserModal = false
      }
      this.loading = false
    }
  },
  beforeMount () {
    this.loading = true
    this.getCustomers({ page: this.page, size: DEFAULT_DISPLAY_SIZE })
      .then(resp => {
        this.adminList = resp.users
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
  .icon-action:hover{
    cursor: pointer;
    color: rgb(5, 105, 109);
  }
</style>
