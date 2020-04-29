<template>
  <aside
    class="menu is-unselectable"
    :class="{ 'is-invisible': !sidebar }"
  >
    <template v-for="(menu, index) in menuss">
      <p
        v-if="menu.title && sidebar"
        class="menu-label"
        :key="`title.${index}`"
      >
        {{ menu.title }}
      </p>
      <ul class="menu-list" :key="`options.${index}`">
        <template v-for="(option, optionIndex) in menu.options">
          <li
            :id="option.to"
            :key="option.id || `title.options.${index}.${optionIndex}`"
            @click="handler(option.to)"
          >

            <template v-if="option.children">
              <a
                :class="{ 'is-active': activeMenus.includes(option.label) }"
                @click="toggleActiveMenu(option.label)"
              >
                <div>
                  <i v-if="option.icon" class="material-icons">{{ option.icon }}</i>
                  {{ option.label }}
                </div>
                <i class="material-icons">
                  {{ activeMenus.includes(option.label) ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
                </i>
              </a>
              <ul v-if="activeMenus.includes(option.label)">
                <li v-for="(child, subIndex) in option.children" :key="`options.${index}.${subIndex}`">
                  <router-link :to="child.to">
                    <i v-if="child.icon" class="material-icons">{{ child.icon }}</i>
                    {{ child.label }}
                  </router-link>
                </li>
              </ul>
            </template>
            <router-link v-else :to="option.to">
              <i v-if="option.icon" class="material-icons">{{ option.icon }}</i>
              {{ option.label }}
            </router-link>
          </li>
        </template>
      </ul>
    </template>
  </aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import menus from '../lib/menu'

export default {
  name: 'TheSidebar',
  data () {
    return {
      menuss: []
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.ui.sidebar,
      activeMenus: state => state.ui.activeMenus,
      activeoption: state => state.ui.activeoption
    })
  },
  methods: {
    ...mapMutations(['toggleActiveMenu', 'cleanActiveMenus', 'getTheActiveMenu']),
    handler (optionId) {

    },
    optionActive () {
      this.getTheActiveMenu(this.$route.path)
      let activeElement = document.getElementsByClassName('activeOption')
      if (activeElement.length > 0) activeElement[0].classList.remove('activeOption')
      let element, name, arr
      if (this.activeoption) {
        element = document.getElementById(this.activeoption)
        if (element) {
          name = 'activeOption'
          arr = element.className.split(' ')
          if (arr.indexOf(name) === -1) {
            element.className += ' ' + name
          }
        }
      }
    }
  },
  beforeMount () {
    this.menuss = menus
  },
  mounted () {
    this.optionActive()
  },
  watch: {
    '$route.path' (newValue, oldValue) {
      this.optionActive()
    }
  }
}
</script>

<style scoped>
  aside {
    background: var(--secondary-color);
    height: auto;
  }

  aside p.menu-label {
    margin: 0;
    padding: 1em;
    color: white;
  }

  aside.is-invisible {
    display: none;
  }

  .menu-list a {
    display: flex;
    align-items: center;
    color: white;
    margin-left: 1em;
  }

  .menu-list a > div {
    display: flex;
    align-items: center;
  }

  .menu-list li:hover {
    background: var(--primary-color);
  }

   .menu-list a:hover {
    background: none;
    opacity: 1;
  }

  .menu-list a.is-active {
    background: rgb(57, 199, 224);
  }

  .activeOption {
    background: var(--primary-color-dark);
  }
  .activeOption a{
    opacity: 1;
  }

  .menu-list a.is-active:hover {
    background: rgba(255,255,255,.1)
  }

  .activeOption:hover {
    background: var(--primary-color-light);
  }

  .menu-list a i:first-child {
    padding-right: .5rem;
  }

  .menu-list a i:last-child {
    padding-left: .5rem;
  }

  .menu-list li ul {
    border-color: var(--primary-color-light);
  }

  @media screen and (max-width: 768px) {
    aside {
      width: 100%;
      padding-bottom: 1em;
    }
  }

  @media screen and (min-width: 769px) {
    aside {
      height: 100%;
      width: 300px;
      overflow-y: auto;
    }
  }
</style>
