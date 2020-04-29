<template>
  <nav
    class="pagination-content"
    role="navigation"
  >
    <a
      class="pagination-previous"
      :disabled="page <= startPage || loading"
      @click="toPreviousPage"
    >
      anterior
    </a>
    <ul class="pagination-list">
      <li v-show="hiddenGoToFirst">
        <a
          class="pagination-link"
          :disabled="page <= secondPage || loading"
          @click="toFirstPage"
        >
          {{ startPage }}
        </a>
      </li>
      <li v-show="hiddenGoToFirst">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <template v-for="(currentPage, index) in pagesArray">
        <li :key="index">
          <a
            @click="goToPage(currentPage)"
            :class="['pagination-link', { 'is-current': currentPage === page }]"
            :disabled="loading"
          >
           {{ currentPage }}
          </a>
        </li>
      </template>
      <li v-show="hiddenToLastPage">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li
        v-show="hiddenToLastPage"
      >
        <a
          class="pagination-link"
          :disabled="page >= secondLastPage || loading"
          @click="toLastPage"
        >
          {{ endPage }}
        </a>
      </li>
    </ul>
    <a
      class="pagination-next"
      :disabled="page >= endPage || loading"
      @click="toNextPage"
    >
      siguiente
    </a>
  </nav>
</template>

<script>
import range from 'lodash/range'

export default {
  name: 'BasePagination',
  props: {
    page: {
      type: Number,
      required: true,
      default: 1
    },
    pages: {
      type: Number,
      required: true,
      default: 0
    },
    action: {
      type: Function,
      required: true
    },
    displayPages: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      emptyArray: 0,
      startPage: 1,
      secondPage: 2
    }
  },
  computed: {
    endPage () { return this.pages },
    secondLastPage () { return this.pages - 1 },
    normalizePagesForArray () { return this.pages + 1 },
    normalizeDisplayPages () { return this.displayPages + 1 },
    hiddenGoToFirst () { return this.page >= 10 },
    hiddenToLastPage () { return this.page <= (this.endPage - 10) },
    pagesArray () {
      const {
        page,
        pages,
        displayPages,
        normalizeDisplayPages,
        startPage,
        normalizePagesForArray
      } = this

      let startRange = this.startPage
      let endRange = this.normalizePagesForArray

      if (pages === startPage) return [1]
      if (pages === startRange) return [startRange]
      if (pages <= displayPages) return range(startRange, endRange)

      if (page >= (normalizePagesForArray - this.displayPages)) {
        startRange = normalizePagesForArray - this.displayPages
        endRange = this.normalizePagesForArray
      } else if (page >= displayPages) {
        startRange = this.isOdd(displayPages) ? (page + 1) - (normalizeDisplayPages / 2) : page - (displayPages / 2)
        endRange = this.isOdd(displayPages) ? page + (normalizeDisplayPages / 2) : page + (displayPages / 2)
      } else {
        endRange = normalizeDisplayPages
      }

      return range(startRange, endRange)
    }
  },
  methods: {
    isOdd (number) { return (number % 2) === 1 },
    toFirstPage () {
      if (this.page > this.secondPage) this.action(this.startPage)
    },
    toPreviousPage () {
      let previousPage = this.page - 1
      if (previousPage >= this.startPage) this.action(previousPage)
    },
    toNextPage () {
      let nextPage = this.page + 1
      if (nextPage <= this.endPage) this.action(nextPage)
    },
    toLastPage () {
      if (this.page < this.secondLastPage) this.action(this.endPage)
    },
    goToPage (page) {
      if (page !== this.page && !this.loading) this.action(page)
    },
    pageToIndexArrayValue: (value) => value - 1
  }
}
</script>

<style scoped>
  .pagination-content {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .pagination-link.is-current {
    color: #e6e6e6;
    font-weight: bold;
    background: var(--secondary-color);;
    border-color: var(--secondary-color);;
  }

  .pagination-previous {
    order: inherit;
  }

  .pagination-list {
    flex-grow: inherit;
  }

  ul > li.active {
    color: var(--secondary-color);;
    font-weight: bold;
  }

  ul > li[disabled] {
    cursor: not-allowed;
    background-color: #e6e6e6;
  }

  @media screen and (max-width: 768px) {
    .pagination-content {
      flex-direction: column;
    }

    .is-medium {
      font-size: .75rem;
    }
  }
</style>
