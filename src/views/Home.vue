<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <the-header/>
    </div>
    <div class="hero-body">
      <the-sidebar/>
      <main class="is-flex">
        <router-view/>
      </main>
    </div>
  </section>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import TheHeader from '@/components/TheHeader'

export default {
  name: 'home',
  components: {
    TheHeader,
    TheSidebar
  }
}
</script>

<style scoped>
  .hero.is-fullheight .hero-body {
    padding: 0;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
  }

  main {
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    .hero.is-fullheight .hero-body {
      flex-direction: column;
    }
  }
</style>

<style>
  .pagination-previous,
  .pagination-link,
  .pagination-next {
    background: white;
  }
  h1 {
    font-size: 30px;
    font-weight: 600;
    padding: 20px;
  }
</style>
