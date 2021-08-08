<template>
  <v-app id="inspire">
    <Alert />
    <Dialog />

    <v-navigation-drawer v-model="drawer" app>
      <v-list v-if="!guest">
        <v-sheet color="grey lighten-4" class="pa-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64">
            <v-img
              :src="
                user.photo_profile
                  ? apiDomain + user.photo_profile
                  : 'https://randomuser.me/api/portraits/men/78.jpg'
              "
            ></v-img>
          </v-avatar>

          <div>{{ user.name }}</div>
        </v-sheet>
        <v-list-item
          v-for="(item, index) in links"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list class="pa-2" v-if="guest">
        <v-btn
          elevation="2"
          color="teal white--text"
          class="mb-2"
          @click="login"
          rounded
          block
        >
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn color="deep-purple white--text" @click="register" rounded block>
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </v-list>

      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn color="red" @click="logout" dark rounded block>
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- If using vue-router -->
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: true,
    links: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Profile", icon: "mdi-card-account-details", route: "/profile" },
      { title: "Blogs", icon: "mdi-post", route: "/blogs" },
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  components: {
    Alert: () => import("./components/Alert.vue"),
    Dialog: () => import("./components/Dialog.vue"),
  },
  methods: {
    login() {
      this.setDialogComponent({ component: "login" });
    },
    register() {
      this.setDialogComponent({ component: "register" });
    },
    logout() {
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/logout",
        headers: {
          Authorization: "Bearer" + this.token,
        },
      };
      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});

          this.setAlert({
            status: true,
            color: "success",
            text: "Anda berhasil logout",
          });
        })
        .catch((response) => {
          this.setAlert({
            status: true,
            color: "error",
            text: response.data.error,
          });
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
  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
};
</script>