<template>
    <div>
        <v-card v-if="blog.id">
            <v-img
          :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"
          class="white--text"
          height="200px"
          >
            <v-card-title
            class="fill=height align-end"
            v-text ="blog.title"
            >
            </v-card-title>
          </v-img>

          <v-card-text>
              <v-simple-table dense>
                  <tbody>
                      <tr>
                          <td><v-icon>mdi-format-title</v-icon></td>
                          <td class="green--text">{{ blog.title }}</td>
                      </tr>
                      <tr>
                          <td><v-icon>mdi-note</v-icon>Deskripsi</td>
                          <td>{{ blog.description }}</td>
                      </tr>
                  </tbody>
              </v-simple-table>
              <div v-if="!guest">
                <input type="file" name ="photo" ref="photo"><br>
                  <v-btn color="blue lighten-1"  dark @click="submitPhoto(blog.id)" >
                    <v-icon left>mdi-check-circle</v-icon>
                    Upload Photo                   
                </v-btn> ||
                  <v-btn color="red lighten-1" dark @click="deleteblog" >
                    <v-icon left>mdi-file-excel-box</v-icon>
                    DELETE                    
                  </v-btn>
                </div>

          </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
  export default{
    data:() => ({
      apiDomain : "https://demo-api-vue.sanbercloud.com",
      blog: {},
    }),

    computed : {
    getBlogs : function(){
                  if(JSON.stringify(this.blog) === '{}') { 
                  return false
              }else { return true}
            },
    ...mapGetters({
            token : 'auth/token',
            guest : 'auth/guest',
        })

  },


  methods : {
    go(){
      let { id } = this.$route.params;

      const config = {
        method : "get",
        url : ` ${this.apiDomain}/api/v2/blog/${id}`
    };

    this.axios(config)
      .then(response => {
        let {blog} = response.data
        console.log(blog.photo)
        this.blog = blog;

      })
      .catch(error =>{
        console.log(error);
      });
    },
      ...mapActions({
            setAlert : "alert/set",
        }),

      deleteblog : function(){
        console.log(this.blog.id)
        if(confirm("Hapus Post Ini?")){
            const config = {
                        method : 'post',
                        url : `${this.apiDomain}/api/v2/blog/${this.blog.id}`,
                        params : {_method : "DELETE"},                                    
                        headers : {
                            "Authorization" : "Bearer " + this.token,
                            }
                        }

            this.axios(config)
                .then(response => {
                    console.log(response)                             
                    this.setAlert({
                            status : true,
                            color : "success",
                            text : "Anda Berhasil Menghapus Blog"
                        })
                    window.history.back()

                })
                .catch (error=>{
                    console.log(error)
                    this.setAlert({
                            status : true,
                            color : "error",
                            text : "Anda Gagal Menghapus Blog"
                        })
                    })
        }
        
    },
    
          submitPhoto : function(id){
                let file = this.$refs.photo.files[0]

                let formData =new FormData()
                formData.append('photo',file)

                let config = {
                        method : 'post',
                        url : `http://demo-api-vue.sanbercloud.com/api/v2/blog/${id}/upload-photo`,
                        data : formData,
                        headers : {
                        "Authorization" : "Bearer " + this.token,
                        }
                    }
                    
                    this.axios(config)
                        .then( (response) => {
                            alert(response.data.message)
                        })
                        .catch( (error) => {
                            console.log(error)
                        })
    }
  },
  created(){
    this.go()
  }
  };
</script>

