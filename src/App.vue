<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <v-list v-if="!guest">
        <v-sheet color="grey lighten-4" class="pa-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64">
            <v-img
              :src="'https://randomuser.me/api/portraits/men/78.jpg'"
            ></v-img>
          </v-avatar>

          <div>john@vuetifyjs.com</div>
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
          color="success"
          class="mb-2"
          @click="login"
          rounded
          block
        >
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn color="primary" rounded block>
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
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

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
export default {
  data: () => ({
    drawer: null,
    links: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "About", icon: "mdi-account-group", route: "/about" },
      { title: "Blogs", icon: "mdi-post", route: "/blogs" },
    ],
    guest: false,
  }),
  methods: {
    login() {
      this.guest = !this.guest;
    },

    logout() {
      this.guest = !this.guest;
    },
  },
};
</script>