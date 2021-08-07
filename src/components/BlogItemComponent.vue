<template>
  <v-flex xs6>
    <v-card>
      <v-img
        :src="
          blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'
        "
        class="white--text"
        height="200px"
      >
        <!-- <v-card-title class="fill-height align-end" v-text="blog.title">
        </v-card-title> -->
      </v-img>

      <v-card-actions>
        <v-progress-linear color="blue-grey" height="7"> </v-progress-linear>
      </v-card-actions>

      <v-card-actions>
        <span> {{ blog.title.substring(0, 25) }}... </span>
      </v-card-actions>
      <v-card-actions>
        <v-progress-linear color="black" height="7"> </v-progress-linear>
      </v-card-actions>

      <v-card-actions>
        <v-btn color="primary lighten-2" text :to="`/blog/${blog.id}`">
          Detail
        </v-btn>
        <v-btn color="warning lighten-2" text :to="`/blog/edit/${blog.id}`">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  props: ["blog"],
};
</script>