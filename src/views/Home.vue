<template>
  <v-container class="ma-0 pa-0" grid-list-lg>
    <div>
      <div class="float-left" v-if="!guest">
        <v-btn small text to="/tambah" class="blue--text">
          <v-icon>mdi-book-edit-outline</v-icon>
          Tambah
        </v-btn>
      </div>
      <div class="float text-right">
        <v-btn small text to="/blogs" class="blue--text">
          All Blogs <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <v-layout wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="`blog-${blog.id}`"
        :blog="blog"
      ></blog-item-component>
    </v-layout>
  </v-container>
</template>

<script>
import BlogItemComponent from "../components/BlogItemComponent.vue";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
  }),

  components: {
    "blog-item-component": BlogItemComponent,
  },

  computed: {
    ...mapGetters({
      guest: "auth/guest",
    }),
  },

  methods: {
    go() {
      const config = {
        method: "get",
        url: this.apiDomain + "/api/v2/blog/random/12",
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.go();
  },
};
</script>

