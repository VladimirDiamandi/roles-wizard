<template>
  <ApolloQuery
      :query="require('@/graphql/FetchPosts.gql')"
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
              {{props.item.id}}
            </template>
            <template v-slot:item.text="props">
              <v-edit-dialog
                :return-value.sync="props.item.text"
                @save="save(props.item)"
              > {{ props.item.text }}
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
          </v-data-table>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
</template>

<script>
import EDIT_POST from "@/graphql/EditPost.gql";
import FETCH_POSTS from "@/graphql/FetchPosts.gql";

export default {
  name: "PostsTable",

  data() {
    return {
      headers: [
        {
          text: "Id",
          value: "id"
        },
        {
          text: "Text",
          value: "text"
        },
      ]
    };
  },

  apollo: {
    posts: FETCH_POSTS,
  },

  methods: {
    async save({id, text}) {
      await this.$apollo.mutate({
        mutation: EDIT_POST,
        variables: {
          id: parseInt(id),
          text,
        },
        update: (store, { data: { getPosts } }) => {
          const data = store.readQuery({ query: FETCH_POSTS });
          data.posts = getPosts;
          store.writeQuery({ query: FETCH_POSTS });
        }
      });
    }
  }
}
</script>
