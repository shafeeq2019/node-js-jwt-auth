<template>
  <div class="col-sm-6 col-sm-offset-3">
    <div class="quote-area" v-if="quote">
      <h2 v-for="i in quote"><blockquote>{{ i.text }}</blockquote></h2>    
    </div>
    
    
  </div>
</template>

<script>
import auth from '../auth'
import api from '../api.js'

export default {
  data() {
    return {
      quote: ''
    }
  },

  methods: {
    async getUserPosts() {
      let data = await api.sendRequest('get','post/getall');
      this.quote = data;
    }
  },

  route: {
    canActivate() {
      return auth.user.authenticated
    }
  },
  mounted() {
    this.getUserPosts();
  }

}
</script>