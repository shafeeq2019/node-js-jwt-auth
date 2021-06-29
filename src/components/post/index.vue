<template>
  <div>
    <b-card :header="post.user.username + ' ' + post.user.id">
      <template #header>
        <span :id="'' + i">
          {{ post.user.username }}
        </span>
      </template>
      <b-card-text>
        {{ post.text }}
      </b-card-text>
      <b-popover :target="'' + i" triggers="hover focus">
        <b-button
          variant="outline-primary"
          size="sm"
          @click="unfollow(post.user.id)"
        >
          <b-icon icon="x"></b-icon> unfollow
        </b-button>
      </b-popover>
      <template #footer>
        <small class="text-muted"
          >{{ post.createdAt }}
          <span v-if="post.likes.length > 0">liked by</span>
          <span v-for="(like, index) in post.likes">
            <span v-if="index < 2">{{ like.user.username }}</span>
            <span v-if="checkComma(post.likes, index)">, </span>
          </span>
          <span
            v-if="post.likes.length > 2"
            class="other-likes"
            @click="showLikes(post.likes)"
            >and {{ post.likes.length - 2 }} more
          </span>
          <b-button
            size="sm"
            style="float: right"
            variant="danger"
            @click="addLike(post.id)"
            v-if="showLikeButton(post.likes)"
          >
            <b-icon icon="heart-fill" aria-label="Help"></b-icon>
          </b-button>
          <b-button
            size="sm"
            style="float: right"
            variant="danger"
            @click="addLike(post.id)"
            v-if="!showLikeButton(post.likes)"
          >
            <b-icon icon="heart" aria-label="Help"></b-icon>
          </b-button>
          <b-button
            size="sm"
            style="float: right; margin-right: 2px"
            @click="getComments(post.id)"
          >
            <b-icon icon="chat-text" aria-label="Help"></b-icon>
          </b-button>
        </small>
      </template>
    </b-card>
    <comment :post="post" />
  </div>
</template>
<script>
import api from "../../api.js";
import comment from "./comment.vue";
export default {
  components: {
    comment,
  },
  props: {
    post: "",
    i: "",
  },
  data() {
    return {
      userId: localStorage.getItem("userID"),
      posts: "",
      postLikes: "",
    };
  },
  methods: {
    showLikeButton(likes) {
      for (var l of likes) {
        if (l.userId == this.userId) {
          return false;
        }
      }
      return true;
    },
    checkComma(likes, index) {
      if (likes.length == 1) {
        return false;
      } else if (likes.length > 1 && index == 0) {
        return true;
      }
    },
    showLikes(likes) {
      this.postLikes = likes;
      this.$bvModal.show("modal-sm");
    },
    async setNewPost() {
      let data = await api.sendRequest("post", "post/add", {
        post: this.post,
      });
      this.post = "";
      this.$parent.getFollowersPosts();
    },
    async getFollowersPosts() {
      let data = await api.sendRequest("get", "post/getFollowersPosts");
      this.posts = data;
    },
    async addLike(postId) {
      let data = await api.sendRequest("post", "like/add", {
        postId: postId,
      });
      this.$parent.getFollowersPosts();
    },
    async unfollow(userId) {
      let data = await api.sendRequest("post", "follower/delete", {
        followedId: userId,
      });
      this.$parent.getFollowersPosts();
    },
    async getComments(postId) {
      this.$root.$emit("bv::toggle::collapse", `${postId}`);
    },
  },
};
</script>
