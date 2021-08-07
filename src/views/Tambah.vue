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

      <v-card-title>Tambah Blog</v-card-title>

      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="title"
            filled
            color="deep-purple"
            label="Title"
            required
          ></v-text-field>

          <v-textarea
            v-model="description"
            auto-grow
            filled
            color="deep-purple"
            label="Description"
            rows="1"
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="primary lighten-2" text @click="tambah"> Simpan </v-btn>
        <v-btn color="warning lighten-2" text @click="clear"> Reset </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
    title: "",
    description: "",
    loading: false,
    email: "mubarok.iqbal@gmail.com",
    password: "sanbercode",
    setToken: "",
  }),

  methods: {
    go() {
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
          console.log("getToken");
          console.log(this.setToken);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    tambah() {
      this.loading = true;

      let data = {
        title: this.title,
        description: this.description,
      };

      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/blog",
        headers: { Authorization: `Bearer ${this.setToken}` },
        data: data,
      };
      this.axios(config)
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          alert(response.data.message);

          this.$router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clear() {
      this.title = "";
      this.description = "";
    },
  },
  created() {
    this.go();
  },
};
</script>

