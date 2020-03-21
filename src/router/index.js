import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/admin/dashboard.vue'
import Peserta from '../views/admin/Peserta.vue'
import JenisPeserta from '../views/admin/JenisPeserta.vue'
import Donasi from '../views/admin/Donasi.vue'
import JenisDonasi from '../views/admin/JenisDonasi.vue'
import Kegiatan from '../views/admin/Kegiatan.vue'
import store from '@/store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/admin/peserta',
    name: 'Peserta',
    component: Peserta,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/admin/jenispeserta',
    name: 'JenisPeserta',
    component: JenisPeserta,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/admin/donasi',
    name: 'Donasi',
    component: Donasi,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/admin/jenisdonasi',
    name: 'JenisDonasi',
    component: JenisDonasi,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/admin/kegiatan',
    name: 'Kegiatan',
    component: Kegiatan,
    beforeEnter: (to,from,next) => {
      if(!store.getters['auth/authenticated']){
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
