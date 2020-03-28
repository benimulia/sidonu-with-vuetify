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
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/peserta',
    name: 'Peserta',
    component: Peserta,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/jenispeserta',
    name: 'JenisPeserta',
    component: JenisPeserta,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/donasi',
    name: 'Donasi',
    component: Donasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/jenisdonasi',
    name: 'JenisDonasi',
    component: JenisDonasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/kegiatan',
    name: 'Kegiatan',
    component: Kegiatan,
    meta: { requiresAuth: true }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/authenticated']) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
