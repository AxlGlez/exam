<template>
  <section class='section'>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <h1>Menú</h1>
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
        <!-- <base-table
          class="is-bordered is-striped is-narrow is-fullwidth is-hoverable bankingTable"
          :columns="columnsData"
          :data="adminList"
          :loading=loading
        >
        <div
          slot="config"
          slot-scope="scope"
        >
          <i class="material-icons icon-action" @click="openEditAdmin(scope.row)">edit</i>
        </div>
        </base-table> -->
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
export default {
  name: 'Menu',
  components: {
    // ModalCustomer: () => import('@/components/customers/ModalChangeCustomer')
  },
  data () {
    return {
    }
  },
  methods: {
  },
  beforeMount () {
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
</style>
