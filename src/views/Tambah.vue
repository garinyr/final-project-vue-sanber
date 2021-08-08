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
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
    title: "",
    description: "",
    loading: false,
  }),

  methods: {
    tambah() {
      this.loading = true;

      let data = {
        title: this.title,
        description: this.description,
      };

      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/blog",
        headers: { Authorization: `Bearer ${this.token}` },
        data: data,
      };
      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Blog berhasil disimpan.",
          });

          this.loading = false;

          this.$router.go(-1);
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Blog gagal disimpan.",
          });
          this.loading = false;
        });
    },

    clear() {
      this.title = "";
      this.description = "";
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
      }
    }
  },
};
</script>

