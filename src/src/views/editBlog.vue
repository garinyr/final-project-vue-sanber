<template>
<div v-if="getBlogs">
    
    <v-card >
        <v-img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="white--text" height="200px">
            <v-card-title class="fill-height align-end" v-text="blog.title">                
            </v-card-title>
        </v-img>
        <v-card-text>
            <v-simple-table dense> 
                <tbody>
                    <tr>
                        <td> <v-icon>mdi-format-title</v-icon> Judul </td>
                        <td><v-text-field type="text"  
                            label="title"  v-model="blog.title" required></v-text-field></td>
                    </tr>
                    <tr>
                        <td><v-icon>mdi-note</v-icon> Deskripsi </td>
                        <td><v-text-field type="text"  
                            label="description"  v-model="blog.description" required></v-text-field> </td>
                    </tr>
                    <tr>
                        <td>
                            <v-btn color="blue lighten-1" @click="update" style="margin : 20px">
                                    UPDATE                   
                            </v-btn>
                        </td>
                        <td>
                            
                            <input type="file" ref="photo" ><br>
                            <v-btn color="blue lighten-1" @click="uploadfoto" style="margin : 20px">
                                    UPLOAD FOTO                   
                            </v-btn>
                        </td>
                    </tr>
                    
                </tbody>
                
                

            </v-simple-table>
            
            
        </v-card-text>
        
        
    </v-card>

</div>
    
</template>
