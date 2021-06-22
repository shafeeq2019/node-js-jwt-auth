<template>
  <div class="col-sm-6 col-sm-offset-3">
  <div>
    <b-form-input v-model="post" placeholder="Write a post" v-if="user.authenticated"  v-on:keyup.enter="setNewPost"></b-form-input>
  </div>
  </div>
</template>
<script>
import api from '../api.js'
import auth from '../auth'
export default {

  data() {
    return {
      user: auth.user,
      post: ''
    }
  },

  methods: {
    async setNewPost() {
      let data = await api.sendRequest('post','post/add', {
        post: this.post
      });
      this.post = ''
    }
  }

}
</script>