<template>
<div>
  <NavBar/>
  <div class="container">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import auth from '../auth'
import NavBar from './NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
  
    }
  },

  methods: {

  }
}
</script>
