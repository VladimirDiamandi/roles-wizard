<template>
  <ApolloQuery
    :query="
      gql =>
        gql`
          ${fetchPostsGql}
        `
    "
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <v-data-table
          :headers="headers"
          :items="data.getPosts"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:item.id="props">
            {{ props.item.id }}
          </template>
          <template v-slot:item.text="props">
            <v-edit-dialog
              :return-value.sync="props.item.text"
              @save="handleSave(props.item)"
            >
              {{ props.item.text }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.text"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.actions="props">
            <v-btn @click.prevent="handleDelete(props.item.id)" color="red">
              DELETE
            </v-btn>
          </template>
        </v-data-table>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No results</div>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EDIT_POST from "@/graphql/EditPost";
import FETCH_POSTS from "@/graphql/FetchPosts";
import DELETE_POST from "@/graphql/DeletePost";
import { EventBus } from "@/utils/event-bus";
import gql from "graphql-tag";

interface TableHeader {
  text: string;
  value: string;
}

interface SaveRequest {
  id: string;
  text: string;
}

@Component({
  apollo: {
    getPosts: gql(FETCH_POSTS)
  }
})
export default class PostsTable extends Vue {
  private headers: Array<TableHeader> = [
    {
      text: "Id",
      value: "id"
    },
    {
      text: "Text",
      value: "text"
    },
    {
      text: "Actions",
      value: "actions"
    }
  ];

  private fetchPostsGql = FETCH_POSTS;

  handleSave(data: SaveRequest) {
    const { id, text } = data;
    this.$apollo.mutate({
      mutation: gql(EDIT_POST),
      variables: {
        id: parseInt(id),
        text
      },
      update: () => {
        this.refreshFetch();
      }
    });
  }

  handleDelete(id: string) {
    this.$apollo.mutate({
      mutation: gql(DELETE_POST),
      variables: {
        id: parseInt(id)
      },
      update: () => {
        this.refreshFetch();
      }
    });
  }

  refreshFetch() {
    this.$apollo.queries.getPosts.refetch();
  }

  mounted() {
    EventBus.$on("post-created", () => {
      this.refreshFetch();
    });
  }

  beforeDestroy() {
    EventBus.$off("post-created");
  }
}
</script>
