<template>
  <b-container style="margin-top: 20px">
    <b-row>
      <b-col cols="11">
        <b-form-input
          v-model="post"
          placeholder="Write a post"
          v-on:keyup.enter="setNewPost"
        ></b-form-input>
      </b-col>
      <b-col cols="1">
        <div>
          <b-dropdown id="dropdown-1" :text="selecetdScope.name">
            <b-dropdown-item v-for="s in scopes" @click="selecetdScope = s">{{
              s.name
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <!-- <p><b>User Infos:</b></p> -->
        <div>
          <b-row class="mt-3 mb-3" v-for="(post, i) in posts">
            <b-col cols="12">
              <post :post="post" :i="i"></post>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import auth from "../../auth";
import api from "../../api.js";
import post from "../post/index.vue";

export default {
  components: {
    post,
  },
  props: {
    id: "",
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      posts: "",
      post: "",
      scopes: [
        { name: "public", id: 1 },
        { name: "follower", id: 2 },
        { name: "pivate", id: 3 },
      ],
      selecetdScope: { name: "public", id: 1 },
    };
  },

  methods: {
    async setNewPost() {
      let data = await api.sendRequest("post", "post", {
        post: this.post,
        scope: this.selecetdScope.id,
      });
      this.post = "";
      this.getPosts();
    },
    async getPosts() {
      let data = await api.sendRequest("get", "post/getUserPost");
      this.posts = data;
    },
  },

  route: {
    canActivate() {
      return auth.user.authenticated;
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>