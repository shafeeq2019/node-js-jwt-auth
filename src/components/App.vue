<template>
<div>
    <nav class="navbar navbar-default">
    <div class="container">
      <ul class="nav navbar-nav">
        <li><a><router-link to="home">Home</router-link></a></li>
        <li v-if="!user.authenticated"><a><router-link to="login">Login</router-link></a></li>
        <li v-if="!user.authenticated"><a><router-link to="signup">Sing up</router-link></a></li>
        <li v-if="user.authenticated"><a><router-link to="secretquote">Secret Quote</router-link></a></li>
        <li v-if="user.authenticated"><a @click="logout()"><router-link to="login">Logout</router-link></a></li>
      </ul>
    </div>    
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },

  methods: {
    logout() {
      auth.logout()
    }
  }
}
</script>
