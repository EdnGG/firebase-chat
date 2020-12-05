import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'
import { auth }  from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
     next()
    } else {
      next({name: "Login"})
    }
  } else {
    next()
  }
})


export default router
