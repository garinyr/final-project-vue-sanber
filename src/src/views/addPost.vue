<template>
<div>    
    <v-form ref="form" >
                <v-text-field type="text"  
                label="title" v-model="title" required></v-text-field>
                <v-text-field type="text" counter 
                label="description" v-model="description" ></v-text-field>
                <div class="text-xs-center">
                <v-btn color="green lighten-1" @click="submitForm()">
                    ADD
                    <v-icon right dark>mdi-arrow-up-bold-box</v-icon>                    
                </v-btn>
                </div> 
    </v-form>    
</div>
    
</template>

<script>
import { mapGetters,mapActions } from 'vuex';

export default {
    data : function(){ 
                        return{                            
                            buttonStatus : 'submit',
                            title : '',
                            description : '',
                            apiDomain : "https://demo-api-vue.sanbercloud.com",                            
                        }    
                    },
    computed : {
        ...mapGetters({
            token : 'auth/token',
        }),
        
    },
    methods : {
        ...mapActions({
            setAlert : "alert/set",
        }),
        submitForm : function(){
                        let formData = new FormData()
                        formData.append('title',this.title)
                        formData.append('description',this.description)
                        const config = {
                                    method : 'post',
                                    url : `${this.apiDomain}/api/v2/blog`,
                                    data : formData,
                                    headers : {
                                        "Authorization" : "Bearer " + this.token,
                                        }
                                    }

                        this.axios(config)
                            .then(response => {            
                             console.log(response)
                             this.title=''
                             this.description=''
                             this.setAlert({
                                        status : true,
                                        color : "success",
                                        text : "Anda Berhasil Menambahkan Post di Blog"
                                    })

                            })
                            .catch (error=>{
                                console.log(error)
                                this.setAlert({
                                        status : true,
                                        color : "error",
                                        text : "Anda Gagal Menambahkan Post di Blog"
                                    })
                                })

                },

        },

    
    
}
</script>
