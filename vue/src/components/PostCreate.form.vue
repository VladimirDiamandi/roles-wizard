<template>
  <ApolloMutation
    :mutation="require('../graphql/CreatePost.gql')"
    :variables="{
      text: postText
    }"
    class="form"
    @done="handlePostCreated"
  >
    <template slot-scope="{ mutate }">
      <v-text-field v-model="postText" label="Text"></v-text-field>
      <v-btn color="success" @click="mutate()">Create new post</v-btn>
    </template>
  </ApolloMutation>
</template>

<script lang="ts">
import _ from "lodash";
import { EventBus } from "@/utils/event-bus";
import { Component, Vue } from "vue-property-decorator";

interface PostCreatedResponse {
  error?: string;
  message?: string;
  data?: {
    createPost: {
      id: string;
    };
  };
}

@Component({})
export default class CreatePostForm extends Vue {
  private postText = "";

  handlePostCreated(data: PostCreatedResponse) {
    this.postText = "";
    const id = _.get(data, "data.createPost.id");
    if (id) {
      EventBus.$emit("post-created", id);
    }
  }
}
</script>
