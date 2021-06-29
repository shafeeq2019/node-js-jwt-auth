<template>
  <div>
    <!-- comments -->
    <b-collapse :id="'' + post.id">
      <b-card style="border-top:0">
        <b-form-input
          v-model="newComment[post.id]"
          placeholder="write a comment !"
          v-on:keyup.enter="addNewComment(post.id)"
          style="margin-bottom: 5px"
        ></b-form-input>
        <b-list-group v-if="comments[post.id]">
          <b-list-group-item button v-for="c in comments[post.id]">
          <span style=" font-weight: bold;"> {{c.user.username}}</span> : {{ c.comment}}
          <popover></popover>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-collapse>
  </div>
</template>
<script>
import api from "../../api.js";
import popover from "./popover.vue";
export default {
  components: {
    popover
  },
  props: {
    post: "",
  },
  data() {
    return {
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
    async getComments(postId) {
      let data = await api.sendRequest("post", "comment/get", {
        postId: postId,
      });
      this.$set(this.comments, postId, data);
    },
  },
  setup() {},
  mounted() {
    this.getComments(this.post.id);
    console.log;
  },
};
</script>
