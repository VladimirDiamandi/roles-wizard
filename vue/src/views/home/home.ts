import WithRender from "./home.html";
import { Component, Vue } from "vue-property-decorator";

import PostsTable from "@/components/Posts.table.vue";
import PostCreateForm from "@/components/PostCreate.form.vue";

@Component({
  components: {
    PostsTable,
    PostCreateForm
  }
})
@WithRender
export default class Home extends Vue {}
