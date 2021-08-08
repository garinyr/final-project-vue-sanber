import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import( /* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/tambah',
    name: 'Tambah',
    component: () => import( /* webpackChunkName: "tambah" */ '../views/Tambah.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () =>
      import( /* webpackChunkName: "blogs" */ '../views/Blogs.vue'),
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () =>
      import( /* webpackChunkName: "blog" */ '../views/Blog.vue'),
  },
  {
    path: '/blog/edit/:id',
    name: 'Edit',
    component: () =>
      import( /* webpackChunkName: "edit" */ '../views/Edit.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router