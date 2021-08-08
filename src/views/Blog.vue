<template>
  <div>
    <div class="left mb-4">
      <v-btn small text @click="$router.go(-1)" class="blue--text">
        <v-icon>mdi-arrow-left</v-icon>
        Kembali
      </v-btn>
    </div>
    <div>
      <v-card v-if="blog.id">
        <v-img
          :src="
            blog.photo
              ? apiDomain + blog.photo
              : 'https://picsum.photos/200/300'
          "
          class="white--text"
          height="200px"
        >
        </v-img>

        <v-card-title>
          {{ blog.title }}
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          {{ blog.description }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blog: [],
    email: "mubarok.iqbal@gmail.com",
    password: "sanbercode",
    setToken: "",
  }),

  methods: {
    getBlog() {
      let { id } = this.$route.params;

      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/${id}`,
      };

      this.axios(config)
        .then((response) => {
          let { blog } = response.data;
          this.blog = blog;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getBlog();
  },
};
</script>

