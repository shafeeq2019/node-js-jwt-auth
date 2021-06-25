<template>
  <div>
    <b-container>
      <b-row class="mt-3 mb-3" v-for="post in posts">
        <b-col cols="12">
          <div>
            <b-card :header="post.user.username">
              <b-card-text>
                {{ post.text }}
              </b-card-text>
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
                </small>
              </template>
            </b-card>
          </div>
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
export default {
  data() {
    return {
      user: auth.user,
      userId: localStorage.getItem("userID"),
      post: "",
      posts: "",
      postLikes: "",
    };
  },

  methods: {
    showLikeButton(likes) {
      for (var l of likes) {
        console.log(l);
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
      this.getAllPosts();
    },
    async getAllPosts() {
      let data = await api.sendRequest("get", "post/getAll");
      console.log(data);
      this.posts = data;
    },
    async addLike(postId) {
      let data = await api.sendRequest("post", "like/add", {
        postId: postId,
      });
      this.getAllPosts();
    },
  },
  mounted() {
    this.getAllPosts();
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