<template>
  <div class="home">
    <PostsTable />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import PostsTable from "@/components/Posts.table.vue";

export default {
  name: "Home",
  components: {
    PostsTable
  }
};
</script>
