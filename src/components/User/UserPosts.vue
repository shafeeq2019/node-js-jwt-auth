<template>
  <b-container style="margin-top: 20px">
    <b-row style="margin-bottom: 10px">
      <b-col cols="11">
        <b-form-input
          v-model="post"
          placeholder="Write a post"
          v-on:keyup.enter="setNewPost"
        ></b-form-input>
      </b-col>
      <b-col cols="1">
        <div>
          <b-dropdown
            id="dropdown-1"
            :text="selecetdScope.name"
        > 
            <b-dropdown-item v-for="s in scopes" @click="selecetdScope = s">{{
              s.name
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3 mb-3" v-for="post in posts">
      <b-col cols="12">
        <div>
          <b-card header="">
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
              </small> </template
          ></b-card></div></b-col></b-row
  ></b-container>
</template>
            </b-card>
          </div>
        </b-col>
      </b-row>
  </b-container
  </div>
</template>

<script>
import auth from "../../auth";
import api from "../../api.js";

export default {
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
    async addLike(postId) {
      let data = await api.sendRequest("post", "like/add", {
        postId: postId,
      });
      this.getUserPosts();
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
        scope: this.selecetdScope.id,
      });
      this.post = "";
      this.getUserPosts();
    },
    async getUserPosts() {
      let data = await api.sendRequest("post", "post/get", {
        userId: this.id
      });
      this.posts = data;
    },
  },

  route: {
    canActivate() {
      return auth.user.authenticated;
    },
  },
  mounted() {
    this.getUserPosts();
  },
};
</script>