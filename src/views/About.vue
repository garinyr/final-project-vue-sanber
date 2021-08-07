<template>
  <v-container> 
    <v-subheader class="blue--text">
      <v-spacer></v-spacer>
      About
    </v-subheader>
    <v-card>
      <v-toolbar dark color="success">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>About</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-form @submit.prevent="submitForm()">
                <v-text-field
                v-model="title"
                label="Title"
                required
                append-icon="mdi-calendar-blank"
                >
                </v-text-field>
                <v-text-field
                v-model="description"
                label="Deskripsi"
                counter
                append-icon="mdi-calendar-blank"
                >
                </v-text-field>

                <div class="text-xs-center">
                    <v-btn
                    color="blue lighten-1"
                    @click="submitPhoto(idUploadBlog)"
                    >
                    Upload
                    <v-icon right dark>
                        mdi-basket-unfill
                    </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                     <v-btn
                    color="red lighten-1"
                    @click="removeBlog(blog.id)"
                    >
                    Delete
                    <v-icon right dark >
                        mdi-magnify-minus
                    </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                     <v-btn
                    color="blue lighten-1"
                    @click="uploadPhoto(blog)"
                    >
                    Upload foto
                    <v-icon right dark >
                        mdi-magnify-minus
                    </v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
  </v-container>

