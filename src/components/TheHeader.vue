<template>
  <header class="navbar is-unselectable">
    <a
      class="navbar-item is-hidden-touch toggle-menu"
      @click="toggleSidebar"
    >
      <i class="material-icons">menu</i>
    </a>
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        to="/"
      >
        <img
          class="is-hidden-mobile"
          src="@/assets/logo.png"
          alt="logo"
        >
      </router-link>

      <div
        class="navbar-burger burger"
        data-target="navMenu"
        @click="toggleSidebar"
      >
        <span/>
        <span/>
        <span/>
      </div>
    </div>

    <div
      id="navMenu"
      class="navbar-menu"
      :class="{ 'is-active': sidebar }"
    >
      <div class="navbar-end">
        <div class="navbar-item">

        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            {{ authentication.name }}
          </a>

          <div class="navbar-dropdown">
            <a
              class="navbar-item"
              @click="signOut"
            >
              <i class="material-icons">exit_to_app</i>
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TheHeader',
  computed: {
    ...mapState({
      authentication: state => state.authentication,
      sidebar: state => state.ui.sidebar
    })
  },
  methods: { ...mapMutations(['toggleSidebar', 'signOut']) }
}
</script>

<style scoped>
  header {
    border: solid 1px #e6e6e6;
  }

  h1 {
    padding-left: 8px;
  }

  .toggle-menu {
    cursor: pointer;
  }

  .navbar-menu .navbar-dropdown .navbar-item {
    display: flex;
    align-items: center;
  }

  .navbar-menu .navbar-dropdown .navbar-item i {
    padding-right: 4px;
  }

  @media screen and (max-width: 768px) {
    .hero header.navbar {
      background: var(--secondary-color);
      border: solid 1px rgba(0, 0, 0, .15);
    }

    .navbar-burger {
      color: white;
    }

    .navbar-menu.is-active {
      box-shadow: none;
      background: var(--secondary-color);
    }

    .navbar-menu.is-active a {
      color: white;
    }

    .navbar-menu.is-active a:hover {
      background: var(--primary-color-light)
    }
  }

  @media screen and (min-width: 769px) {
    .hero header.navbar {
      background: white;
    }
  }
</style>
