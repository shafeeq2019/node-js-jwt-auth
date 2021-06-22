<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Get a Secret Chuck Norris Quote!</h1>
    <button class="btn btn-warning" v-on:click="getQuote()">Get a Quote</button>
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
    async getQuote() {
      let data = await api.sendRequest('get','post/getall');
      this.quote = data;
    }
  },

  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>