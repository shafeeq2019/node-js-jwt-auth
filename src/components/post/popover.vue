<template>
  <div>
    <b-popover
      :target="'' + postUserId"
      triggers="hover focus"
      v-if="postUserId != userId"
    >
      <b-button
        variant="outline-primary"
        size="sm"
        @click="unfollow(postUserId)"
      >
        <b-icon icon="x"></b-icon> unfollow
      </b-button>
    </b-popover>
  </div>
</template>
<script>
import api from "../../api.js";
export default {
  props: {
    postUserId: "",
  },
  data() {
    return {
      userId: localStorage.getItem("userID"),
    };
  },
  methods: {
    async unfollow(userId) {
      let data = await api.sendRequest("post", "follower/delete", {
        followedId: userId,
      });
      this.$parent.getFollowersPosts();
    },
  },
  mounted() {},
};
</script>
