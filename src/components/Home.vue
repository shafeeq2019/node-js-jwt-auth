<template>
  <div>
    <b-container>
      <b-row class="mt-3 mb-3" v-for="(post, i) in posts">
        <b-col cols="12">
          <post :post="post" :i="i"></post>
        </b-col>
      </b-row>
    </b-container>
    <!-- likes modal -->
    <b-modal
      id="modal-sm"
      size="sm"
      scrollable
      title="Post liked by"
      :hide-footer="true"
      :hide-header-close="true"
    >
      <b-list-group flush>
        <b-list-group-item href="#" v-for="like in postLikes">{{
          like.user.username
        }}</b-list-group-item>
      </b-list-group>
    </b-modal>
  </div>
</template>
<script>
import api from "../api.js";
import auth from "../auth";
import post from "./post/index.vue";
export default {
  components: {
    post
  },
  data() {
    return {
      user: auth.user,
      userId: localStorage.getItem("userId"),
      post: "",
      posts: "",
      postLikes: "",
      comments: {},
      newComment: {},
    };
  },

  methods: {
    async addNewComment(postId) {
      let newCommentRes = await api.sendRequest("post", "comment/add", {
        postId: postId,
        comment: this.newComment[postId],
      });
      let getCommentsRes = await api.sendRequest("post", "comment/get", {
        postId: postId,
      });
      this.comments[postId] = getCommentsRes;
      this.newComment[postId] = "";
    },
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
      this.getPosts();
    },
    async getPosts() {
      let data = await api.sendRequest("get", "post/follower", {
        size: 100
      });
      this.posts = data.items;
    },
    async addLike(postId) {
      let data = await api.sendRequest("post", "like/add", {
        postId: postId,
      });
      this.getPosts();
    },
    async unfollow(userId) {
      let data = await api.sendRequest("post", "follower/delete", {
        followedId: userId,
      });
      this.getPosts();
    },
    async getComments(postId) {
      let data = await api.sendRequest("post", "comment/get", {
        postId: postId,
      });
      this.$set(this.comments, postId, data);
      this.$root.$emit("bv::toggle::collapse", `${postId}`);
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
<style scoped>
.other-likes:hover {
  text-decoration: underline;
}

.other-likes {
  cursor: pointer;
}
</style>
