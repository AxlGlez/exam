<template>
  <table class="table">
    <thead>
      <tr>
        <template v-for="(column, index) in columns">
          <th :class="[column.class]" v-if="column.colspan > 0" :key="column.id || index" :colspan="column.colspan">{{ column.header }}</th>
          <template v-else-if="column.colspan === 0"></template>
          <th :class="[column.class]" v-if="!column.colspan" :key="column.id || index" :colspan="column.colspan">{{ column.header }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-if="data.length === emptyData || loading">
        <td
          colspan="40"
          :class="{ loading, empty: data.length === emptyData }"
          align="center"
        ><p class="has-text-centered">No hay información.</p></td>
      </tr>
      <template v-else v-for="(row, rowIndex) in data">
        <tr :key="composeTrKey(row, rowIndex)">
          <template v-for="(field, fieldIndex) in columns">
            <td :class="[field.class]" :key="composeTdKey(row, rowIndex, field, fieldIndex)" v-if="field.link">
              <router-link :to="createLink(field, row)">{{ printFieldData(field, row) }}</router-link>
            </td>
            <td :class="[field.class]" :key="composeTdKey(row, rowIndex, field, fieldIndex)" v-else>
              {{ printFieldData(field, row) }}
              <slot v-if="field.name" :name="field.name" :row="row"></slot>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import get from 'lodash/get'

export default {
  name: 'BaseTable',

  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean
    },
    pagination: {
      type: Object
    }
  },

  data () {
    return {
      emptyData: 0
    }
  },

  methods: {
    composeTrKey (row, rowIndex) {
      return `${row.id}.${rowIndex}`
    },
    composeTdKey (row, rowIndex, field, fieldIndex) {
      if (row.id && field.id) return `${row.id}.${field.id}`
      if (row.id && !field.id) return `${row.id}.${fieldIndex}`
      if (!row.id && field.id) return `${rowIndex}.${field.id}`
      return `${rowIndex}.${fieldIndex}`
    },
    printFieldData (field, row) {
      if (field.name) return ''
      if (typeof field.accessor === 'function') return field.accessor(row)
      if (typeof field.accessor === 'string') return get(row, field.accessor, '')
      if (field.id) return get(row, field.id, '')
      return ''
    },
    createLink (field, row) {
      if (field.type === 'ancla') return `#${row.route}`
      if (field.type === 'link') {
        if (typeof field.route === 'function') return field.route(row)
        if (typeof field.route === 'string') return get(row, field.route, '')
        return ''
      }
    }
  }
}
</script>
<style scoped>
  td {
    font-size: 0.85rem;
  }
  .link a {
    cursor: pointer;
    color: #658abf;
  }
  .link a:hover {
    cursor: pointer;
    color: #ed6e00;
  }
  .table th {
    text-align: center;
    background-color: #2E3133;
    color: #f5fcff !important;
    border: #EE7C34;
    padding: 10px 0;
  }

  .table th:first {
    border-radius: 5px 0 0 0;
  }
  .table th:last-child {
    border-radius: 0 5px 0 0;
  }
</style>
