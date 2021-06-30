<template>
  <b-container>
    <b-row class="mt-3 mb-3">
      <b-col cols="4">
        <p><b>Followers:</b></p>
        <b-list-group>
          <b-list-group-item v-for="follower in followers" button>{{follower.follower.username}}</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="8">
          <p><b>User Infos:</b></p>

      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import api from "../api.js";
import auth from "../auth";
export default {
    props:{
        id:''
    },
  data() {
    return {
      followers: "",
    };
  },
  methods: {
    async getFollowers() {
      let data = await api.sendRequest("get", "follower/getUserFollowers");
      this.followers = data;
    },
  },
  mounted() {
      this.getFollowers();
  }
};
</script>