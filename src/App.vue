<template>
  <div id="app">
    <the-notification/>
    <router-view/>
  </div>
</template>

<script>
import TheNotification from '@/components/ui/TheNotifications'
export default {
  name: 'App',
  components: { TheNotification },
  mounted () {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1024 && this.$store.state.ui.sidebar) {
        this.$store.commit('toggleSidebar')
      } else if (window.innerWidth >= 1024 && !this.$store.state.ui.sidebar) {
        this.$store.commit('toggleSidebar')
      }
    })
  }
}
</script>

<style lang="sass">
  $body-background-color: whitesmoke;

  @import "bulma/bulma.sass";
  @import "bulma-switch/src/sass/index.sass";
</style>

<style>
  :root {
    --error-color: #ff3860;
    --primary-color: #32c3e7;
    --primary-color-light: #658abf;
    --primary-color-dark: #0ca7ce;
    --secondary-color: #191a1b;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: auto!important;
  }

  #app {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }

  #app > .hero {
    flex: 1;
  }

  /* Condicion para ocultar la barra de estilos del componente vue2-editor */
  .is-disabled .ql-toolbar.ql-snow .ql-formats {
    display: none;
  }
  .is-disabled .ql-editor a {
    pointer-events: none;
    color: currentColor;
    cursor: not-allowed;
    opacity: 0.5;
  }
  .is-disabled .ql-toolbar {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
  /* Termina condicion */

</style>
