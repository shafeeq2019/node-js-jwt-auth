<template>
  <b-container class="bv-example-row" style="margin-top:20px">
      <b-row class="justify-content-md-center" style="margin-bottom:10px">
    <b-col cols="12">
      <b-form-input v-model="post" placeholder="Write a post"  v-on:keyup.enter="setNewPost"></b-form-input>
      </b-col>
  </b-row>
    <b-row class="justify-content-md-center" v-for="post in posts">
      <b-col cols="12">
            <b-card title="Card title" sub-title="Card subtitle" style="margin-bottom:10px">
                <b-card-text>
                  {{post.text}}
                </b-card-text>
                <b-card-text>A second paragraph of text in the card.</b-card-text>
                <a href="#" class="card-link">Delete</a>
                <b-link href="#" class="card-link">Another link</b-link>
            </b-card>
      </b-col>
    </b-row>
  </b-container
  </div>
</template>

<script>
import auth from '../auth'
import api from '../api.js'

export default {
  data() {
    return {
      posts: '',
      post: '' 
    }
  },

  methods: {
    async getUserPosts() {
      let data = await api.sendRequest('get','post/getMyPosts');
      this.posts = data;
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