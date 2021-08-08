<template>
  <v-card>
    <v-toolbar dark color="teal">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          :rules="emailRules"
          append-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-efe-off'"
          :type="showPassword ? 'text' : 'password'"
          counter
          :rules="passRules"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <div class="text-xs-center">
          <v-btn color="teal white--text" @click="submit">
            Login
            <v-icon right dark>mdi-lock-open</v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      apiDomain: "https://demo-api-vue.sanbercloud.com",
      showPassword: false,
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail harus diisi",
        (v) => /.+@.+\..+/.test(v) || "E-mail harus valid",
      ],
      passRules: [
        (v) => !!v || "Password harus diisi",
        (v) =>
          (v && v.length >= 8) || "Password harus lebih dari 10 characters",
      ],
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
    }),
    close() {
      this.$emit("closed", false);
    },
    submit() {
      this.$refs.form.validate();
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
          this.setToken(response.data.access_token);
          this.setAlert({
            status: true,
            color: "success",
            text: "Login Berhasil",
          });
          this.close();
        })
        .catch((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "error",
            text: "Login Gagal",
          });
        });
    },
  },
};
</script>
