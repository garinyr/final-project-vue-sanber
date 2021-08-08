import axios from 'axios'

let api = axios.create({
    baseURL: 'http://demo-api-vue.sanbercloud.com',
  })


  api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  export default api;