import api from './Api'


export default {
      
    
    fetch () {
        return api.get('/api/v2/blog');
    },

    

    store (form) {
        let token ='eeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZGVtby1hcGktdnVlLnNhbmJlcmNsb3VkLmNvbS9hcGkvdjIvYXV0aC9sb2dpbiIsImlhdCI6MTYyMjM3NTI4NiwiZXhwIjoxNjIyNzc1MjQ2LCJuYmYiOjE2MjIzNzUyODYsImp0aSI6Ik1WdUdYRG02NnVwYUFYaGgiLCJzdWIiOjIxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.M91QsWWZrkljO0JI0fEvyzno5lecvP2tObGv4BZIz60';
        let config = {
            headers: {
                'Authorization' : 'Bearer '+ token
            },
        }
        let data = {form}

        return api.post('/api/v2/blog', config, data);
        
    },
    
    
    
}