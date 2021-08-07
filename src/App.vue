<template>
 <!-- App.vue -->

<v-app>

  <!-- <v-snackbar
    v-model="snackbarStatus"
    color="success"
    buttom
    timeout="2000"
    multi-line
    outlined
  >
    {{ snackbarText }}

    <template v-slot:action="{ attrs}">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbarStatus = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar> -->
  <Alert/>
  <Dialog/> 

  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <v-list-item v-if="!quest">
        <v-list-item-avatar>
          <v-img :src="user.photo_profile ? apiDomain + user.photo_profile :'https://randomuser.me/api/portraits/men/78.jpg'"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div class="pa-2" v-if="quest">
        <v-btn block color="primary" class="mb-1" @click="login">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
           <v-btn block color="success">
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </div>

      <v-divider></v-divider>
      <v-list-item 
        v-for="(item, index) in menus"
        :key="`menu-`+index"
        :to="item.route"
      >
      <v-list-item-icon>
        <v-icon left>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append v-if="!quest">
      <div class="pa-2">
        <v-btn block color="red" dark @click="logout">
          <v-icon left>mdi-lock</v-icon>
            Logout
        </v-btn>
      </div>
    </template>

  </v-navigation-drawer>

  <v-app-bar app color="default" dark>
    <v-app-bar-nav-icon @click.stop="drawer =!drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Oke Aja</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white" icon>
    <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
    </v-container>
  </v-main>

  <v-footer app>
    @Sanbercode | Vuejs
  </v-footer>
</v-app>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'App',
  components: { 
     Alert: () => import('./components/Alert.vue'),
     Dialog: () => import('./components/Dialog.vue')
  },

  data: () => ({
    drawer: true,
    menus:[
      {title:'Home', icon: 'mdi-home', route:'/'},
      {title:'Blogs', icon: 'mdi-note', route:'/blogs'},
      {title:'About',icon:'mdi-pentagon',route:'/about'},
    ],
    apiDomain : "https://demo-api-vue.sanbercloud.com",
  }),
      computed :{
      ...mapGetters({
        quest: 'auth/quest',
        user : 'auth/user',
        token: 'auth/token',
    // snackbarStatus : false,
    // snackbarText : 'Anda berhasil login'
      })
    },

  methods : {
    logout(){

      let config = {
        method: 'post',
        url: this.apiDomain + '/api/v2/auth/logout',
        headers: {
          'Authorization' : 'Bearer' + this.token,
        },
      }
      this.axios(config)
        .then(() => {
          this.setToken('')
          this.setUser({})

            // this.quest = true
            this.setAlert ({
              status : true,
              color : 'success',
              text : 'Anda berhasil logout'
            })

        })
        .catch((responses)=> {
          this.setAlert ({
              status : true,
              color : 'error',
              text : responses.data.error
            })
        })

    },
    login() {
      // this.quest = false,
      // this.setAlert ({
      //   status : true,
      //   color : 'success',
      //   text : 'Anda berhasil login'
      // })
      this.setDialogComponent({'component': 'login'})
    },
  ...mapActions({
    setAlert : 'alert/set',
    setDialogComponent : 'dialog/setComponent',
    setToken: 'auth/setToken',
    setUser: 'auth/setUser',
    checkToken: 'auth/checkToken',
  }),
},
  mounted(){
    if(this.token){
      this.checkToken(this.token)
    }
    // this.snackbarStatus = true
  }
};
</script>