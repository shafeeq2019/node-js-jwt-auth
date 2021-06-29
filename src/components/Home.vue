<template>
  <div>
    <b-container>
      <b-row class="mt-3 mb-3" v-for="(post, i) in posts">
        <b-col cols="12">
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
          </div>
        </b-col>
        <!-- comments -->
        <b-collapse :id="'' + post.id">
          <b-card>
            <b-form-input
              v-model="newComment"
              placeholder="write a comment !"
              v-on:keyup.enter="addNewComment(post.id)" style="margin-bottom:5px"
            ></b-form-input>
            <b-list-group v-if="comments.length > 0">
              <b-list-group-item button v-for="c in comments">{{
                c.comment
              }}</b-list-group-item>
            </b-list-group>
          </b-card>
        </b-collapse>
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
    <!-- comments modal -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Comments"
      :hide-header-close="true"
    >
      <b-list-group>
        <b-list-group-item button>Button item</b-list-group-item>
        <b-list-group-item button>I am a button</b-list-group-item>
        <b-list-group-item button disabled>Disabled button</b-list-group-item>
        <b-list-group-item button>This is a button too</b-list-group-item>
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
      comments: [],
      newComment: "",
    };
  },

  methods: {
    async addNewComment(postId) {
      let newCommentRes = await api.sendRequest("post", "comment/add", {
        postId: postId,
        comment: this.newComment,
      });
      let getCommentsRes = await api.sendRequest("post", "comment/get", {
        postId: postId,
      });
      this.comments = getCommentsRes;
      this.newComment = "";
    },
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
      this.getFollowersPosts();
    },
    async getFollowersPosts() {
      let data = await api.sendRequest("get", "post/getFollowersPosts");
      this.posts = data;
    },
    async addLike(postId) {
      let data = await api.sendRequest("post", "like/add", {
        postId: postId,
      });
      this.getFollowersPosts();
    },
    async unfollow(userId) {
      let data = await api.sendRequest("post", "follower/delete", {
        followedId: userId,
      });
      this.getFollowersPosts();
    },
    async getComments(postId) {
      let data = await api.sendRequest("post", "comment/get", {
        postId: postId,
      });
      this.comments = data;
      this.$root.$emit("bv::toggle::collapse", `${postId}`);
    },
  },
  mounted() {
    this.getFollowersPosts();
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