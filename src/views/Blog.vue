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
        <div v-if="!guest">
          <!-- <input type="file" name="photo" ref="photo" /><br /> -->
          <div class="col-4">
            <v-file-input
              v-model="photo"
              placeholder="Upload Photo"
              label="File input"
              multiple
              prepend-icon="mdi-paperclip"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </div>
          <div class="pl-4 pb-4">
            <v-btn
              class="mr-4"
              color="blue lighten-1"
              dark
              @click="submitPhoto(blog.id)"
            >
              <v-icon left>mdi-check-circle</v-icon>
              Upload Photo
            </v-btn>

            <v-btn color="red lighten-1" dark @click="deleteblog">
              <v-icon left>mdi-file-excel-box</v-icon>
              DELETE
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blog: [],
    photo: [],
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
    ...mapActions({
      setAlert: "alert/set",
      setProgress: "progress/set",
      setDialogComponent: "dialog/setComponent",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),

    deleteblog: function () {
      if (confirm("Hapus post Ini?")) {
        const config = {
          method: "post",
          url: `${this.apiDomain}/api/v2/blog/${this.blog.id}`,
          params: { _method: "DELETE" },
          headers: {
            Authorization: "Bearer " + this.token,
          },
        };

        this.axios(config)
          .then((response) => {
            console.log(response);
            this.setAlert({
              status: true,
              color: "success",
              text: "Anda berhasil menghapus post",
            });
            window.history.back();
          })
          .catch((error) => {
            console.log(error);
            this.setAlert({
              status: true,
              color: "error",
              text: "Anda gagal menghapus post",
            });
          });
      }
    },

    submitPhoto: function (id) {
      let formData = new FormData();
      formData.append("photo", this.photo[0]);

      let config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/blog/${id}/upload-photo`,
        headers: {
          Authorization: "Bearer " + this.token,
        },
        data: formData,
      };

      this.axios(config)
        .then((response) => {
          alert(response.data.message);
          console.log(response.data.message);
          this.setAlert({
            status: true,
            color: "success",
            text: "Anda berhasil upload photo",
          });
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
          this.setAlert({
            status: true,
            color: "success",
            text: "Anda gagal upload photo",
          });
        });
    },
  },
  computed: {
    getBlogs: function () {
      if (JSON.stringify(this.blog) === "{}") {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters({
      token: "auth/token",
      guest: "auth/guest",
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
