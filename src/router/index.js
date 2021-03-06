import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Iklan from '../views/Iklan.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login, footer: Footer}
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register, footer: Footer} 
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
  },
  {
    path: '/iklan',
    name: 'iklan',
    components: {default: Iklan, header: Navbar, footer: Footer},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router