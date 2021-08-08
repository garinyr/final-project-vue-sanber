<template>
  <v-card>
    <v-toolbar dark color="deep-purple">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Register</v-toolbar-title>
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
        <v-text-field
          v-model="name"
          label="Nama Lengkap"
          required
          :rules="nameRules"
          append-icon="mdi-card-account-details"
        ></v-text-field>
        <v-file-input
          show-size
          truncate-length="50"
          label="Foto Profile"
          v-model="foto"
          required
        ></v-file-input>

        <div class="text-xs-center">
          <v-btn color="deep-purple white--text" @click="submit">
            Register
            <v-icon right dark>mdi-account</v-icon>
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
      name: "",
      foto: null,
      apiDomain: "https://demo-api-vue.sanbercloud.com",
      showPassword: false,
      valid: true,
      nameRules: [(v) => !!v || "Name harus diisi"],
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
      let formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("name", this.name);
      formData.append("photo_profile", this.foto);
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/register",
        headers: {
          Accept: "application/json",
        },
        data: formData,
      };
      this.axios(config)
        .then((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "success",
            text: "Pendaftaran Berhasil",
          });
          this.close();
        })
        .catch((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "error",
            text: "Pendaftaran Gagal",
          });
        });
    },
  },
};
</script>
