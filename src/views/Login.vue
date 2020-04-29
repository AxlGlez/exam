<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="columns is-centered vcenteded">
        <div class="column is-6">
          <div class="box">
            <figure class="avatar">
              <img src="@/assets/logo.png">
            </figure>
            <form
              @submit.prevent="loginUser"
            >
              <div class="field">
                <div class="control">
                  <input class="input"
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    autofocus=""
                    autocomplete="off"
                    v-model="email"
                    >
                </div>
              </div>
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                      v-model="pass"
                    >
                  </div>
                </div>
              <button :class="{'is-loading': loading}" class="button is-block is-info is-medium is-fullwidth">Ingresar</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      pass: null,
      loading: false
    }
  },
  computed: {
    ...mapState({ authentication: state => state.authentication })
  },
  methods: {
    ...mapMutations(['setAuthenticationValue']),
    ...mapActions(['signin']),
    loginUser () {
      this.loading = true
      let data = {
        email: this.email,
        password: this.pass
      }
      this.signin(data)
        .then(resp => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
  .login {
    align-items: center;
    justify-content: center;
  }
  .box {
    box-shadow: 8px 13px 25px 0 rgba(0, 0, 0, 0.18);
    padding: 0 40px 40px 40px;
  }
  .box img {
    width: 250px;
  }
  .box .button {
    margin-top: 50px;
    background: #2c79b6;
  }
  .hero-body {
    padding: 0rem 1.5rem !important;
    background-color: #27384e;
  }
  .vcenteded {
    display: flex;
    min-height: 100vh;
    align-items: center;
  }
</style>
