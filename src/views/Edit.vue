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
      <div class="pt-2">
        <v-btn small text @click="$router.go(-1)" class="blue--text">
          <v-icon>mdi-arrow-left</v-icon>
          Kembali
        </v-btn>
      </div>

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
        <v-btn color="warning lighten-2" text @click="getBlog"> Reset </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blog: [],
    id: null,
    title: "",
    description: "",
    loading: false,
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

          this.id = blog.id;
          this.title = blog.title;
          this.description = blog.description;
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
        headers: { Authorization: `Bearer ${this.token}` },
        data: data,
      };
      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Blog berhasil diupdate.",
          });
          this.loading = false;

          this.$router.replace(`/blog/${this.id}`);
        })
        .catch((error) => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Blog gagal diupdate.",
          });
          console.log(error);
        });
    },

    ...mapActions({
      setAlert: "alert/set",
      setDialogComponent: "dialog/setComponent",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),
  },

  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },

  created() {
    if (this.guest == true) {
      this.setAlert({
        status: true,
        color: "error",
        text: "Anda tidak punya akses, login terlebih dahulu.",
      });

      this.$router.replace(`/`);
    } else {
      if (this.token) {
        this.checkToken(this.token);
        this.getBlog();
      }
    }
  },
};
</script>

