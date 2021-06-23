<template>
  <b-container class="bv-example-row" style="margin-top:20px">
      <b-row class="justify-content-md-center">
    <b-col cols="12">
      <b-form-input v-model="post" placeholder="Write a post" v-if="user.authenticated"  v-on:keyup.enter="setNewPost"></b-form-input>
      </b-col>
  </b-row>
    <b-row class="justify-content-md-center" v-for="post in posts">
      <b-col cols="12">
        <div class="quote-area" v-if="posts">
          <h2>
            <blockquote><i style="color:red;font-size:16px">{{post.user.email}}</i> <br> {{ post.text }}</blockquote>
          </h2>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
  import api from '../api.js'
  import auth from '../auth'
  export default {

    data() {
      return {
        user: auth.user,
        post: '',
        posts: ''
      }
    },

    methods: {
      async setNewPost() {
        let data = await api.sendRequest('post', 'post/add', {
          post: this.post
        });
        this.post = '';
        this.getAllPosts();
      },
      async getAllPosts() {
        let data = await api.sendRequest('get', 'post/getAll');
        console.log(data)
        this.posts = data;
      }
    },
    mounted() {
      this.getAllPosts();
    }
  }
</script>