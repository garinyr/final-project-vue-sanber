import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Blogs.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
  },
  {
    path: '/addPost',
    name: 'addPosts',
    component: () => import(/* webpackChunkName: "about" */ '../views/addPost.vue')
  },
  {
    path: '/editBlog/:id',
    name: 'editBlog',
    component: () => import(/* webpackChunkName: "about" */ '../views/editBlog.vue')
  },
  
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
