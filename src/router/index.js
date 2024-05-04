import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import '../assets/styles.css';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/registration',
    name: 'registration',

    component: () => import('../views/tilas/RegistrationView.vue')
  },
  {
    path: '/info',
    name: 'info',

    component: () => import('../views/tilas/InfoView.vue')
  },
  {
    path: '/info',
    name: 'info',

    component: () => import('../views/tilas/HistoryView.vue')
  },
  {
    path: '/login',
    name: 'login',

    component: () => import('../views/tilas/LoginView.vue')
  },
  {
    path: '/userInfo',
    name: 'userInfo',

    component: () => import('../views/tilas/UserInfoView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
