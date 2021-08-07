<template>
  <v-container class="ma-0 pa-0" grid-list-sm>
    <v-card :loading="loading" class="mx-auto my-12" max-width="720">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>Edit Blog</v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="title"
            filled
            color="deep-purple"
            label="Title"
            required
            >{{ this.title }}</v-text-field
          >

          <v-textarea
            v-model="description"
            auto-grow
            filled
            color="deep-purple"
            label="Description"
            rows="1"
            >{{ this.description }}</v-textarea
          >
        </v-form>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="primary lighten-2" text @click="update"> Update </v-btn>
        <v-btn color="warning lighten-2" text> Reset </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blog: [],
    email: "mubarok.iqbal@gmail.com",
    password: "sanbercode",
    setToken: "",
    id: null,
    title: "",
    description: "",
    loading: false,
  }),

  methods: {
    go() {
      let { id } = this.$route.params;

      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/${id}`,
      };

      this.axios(config)
        .then((response) => {
          let { blog } = response.data;
          this.blog = blog;

          this.id = blog.id;
          this.title = blog.title;
          this.description = blog.description;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUser() {
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/login",
        data: {
          email: this.email,
          password: this.password,
        },
      };

      this.axios(config)
        .then((response) => {
          this.setToken = response.data.access_token;
          console.log("getToken-blog");
          console.log(this.setToken);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update() {
      let data = {
        title: this.title,
        description: this.description,
      };

      const config = {
        method: "put",
        url: `${this.apiDomain}/api/v2/blog/${this.id}`,
        headers: { Authorization: `Bearer ${this.setToken}` },
        data: data,
      };
      this.axios(config)
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          alert(response.data.message);

          this.$router.replace(`/blog/${this.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.go();
    this.getUser();
  },
};
</script>

