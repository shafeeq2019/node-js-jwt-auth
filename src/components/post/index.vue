<template>
  <div>
    <b-card :header="post.user.username + ' ' + post.user.id">
      <template #header>
        <span :id="post.user.id">
          {{ post.user.username }}
        </span>
      </template>
      <b-card-text>
        {{ post.text }}
      </b-card-text>
      <popover :postUserId="post.user.id"></popover>

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
          <b-button
            size="sm"
            style="float: right; margin-right: 2px"
            @click="deletePost(post.id)"
            v-if="post.user.id == user.userId"
          >
            <b-icon icon="trash" aria-label="Help"></b-icon>
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
import auth from "../../auth";
import popover from "./popover.vue";
export default {
  components: {
    comment,
    popover,
  },
  props: {
    post: "",
    i: "",
  },
  data() {
    return {
      user: auth.user,
      posts: "",
      postLikes: ""
    };
  },
  methods: {
    showLikeButton(likes) {
      for (var l of likes) {
        if (l.userId == auth.user.userId) {
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
    },
    async getPosts() {
      this.$parent.getPosts();
    },
    async addLike(postId) {
      let data = await api.sendRequest("post", "like/add", {
        postId: postId,
      });
      this.$parent.getPosts();
    },

    async getComments(postId) {
      this.$root.$emit("bv::toggle::collapse", `${postId}`);
    },
    async deletePost(postId) {
      let data = await api.sendRequest("delete", `post/${postId}`);
      this.$parent.getPosts();
    },
  },
  mounted() {},
};
</script>
