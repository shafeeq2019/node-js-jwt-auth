<template>
  <b-container>
    <b-row class="mt-4 mb-3" align-h="between">
      <b-col cols="2">
        <h2>{{username}}<b-badge>New</b-badge></h2>
        <p><b>Followers:</b></p> 
        <b-list-group>
          <b-list-group-item v-for="follower in followers" @click="$router.push({ name: 'profile', params: { id: follower.follower.id }})" button>{{
            follower.follower.username
          }}</b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col cols="8">
        <!-- <p><b>User Infos:</b></p> -->
        <div>
          <b-row v-if="this.id == user.userId">
            <b-col cols="10">
              <b-form-input
                v-model="post"
                placeholder="Write a post"
                v-on:keyup.enter="setNewPost"
              ></b-form-input>
            </b-col>
            <b-col cols="2">
              <div>
                <b-dropdown
                  id="dropdown-1"
                  :text="selecetdScope.name"
                  style="width: 100%"
                >
                  <b-dropdown-item
                    v-for="s in scopes"
                    @click="selecetdScope = s"
                    >{{ s.name }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3 mb-3" v-for="(post, i) in posts">
            <b-col cols="12">
              <post :post="post" :i="i"></post>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <!-- <b-col cols="4">
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.name"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-col> -->
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
      user: auth.user,
      username:'',
      posts: "",
      post: "",
      show: true,
      followers: [],
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
    async getFollowers() {
      let data = await api.sendRequest("get", `follower/getFollowers/${this.id}`);
      this.followers = data;
    },
    async getPosts() {
      let data = await api.sendRequest("get", `post/getUserpost/${this.id}`);
      this.posts = data.data;
      this.username = data.user.username
    },
  },
  created() {
    this.getFollowers();
    this.getPosts();
  },
};
</script>
<style >
label {
  margin-bottom: 0.5rem;
}
.form-group {
  margin-bottom: 1rem;
}
</style>