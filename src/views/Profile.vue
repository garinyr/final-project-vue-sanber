<template>
  <v-container class="ma-0 pa-0" grid-list-sm>
    <div class="pt-2">
      <v-btn small text @click="$router.go(-1)" class="blue--text">
        <v-icon>mdi-arrow-left</v-icon>
        Kembali
      </v-btn>
    </div>
    <v-card max-width="375" class="mx-auto">
      <v-card-title class="grey lighten-4">
        <!-- <span class="black--text">  </span> -->
        Profile
      </v-card-title>
      <!-- <v-divider class="pb-2"></v-divider> -->
      <v-img
        :src="
          user.photo_profile
            ? apiDomain + user.photo_profile
            : 'https://randomuser.me/api/portraits/men/78.jpg'
        "
      >
      </v-img>

      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-card-account-details-outline </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle>{{ this.user.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-email-outline </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ this.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),

  methods: {
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

