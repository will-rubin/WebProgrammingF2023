import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getSession } from '@/model/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/stats',
      name: 'statistics',
      component: () => import('../views/StatsView.vue')
    },
    {
      path: '/myexercises',
      name: 'myexercises',
      component: () => import('../views/MyExercises.vue')
    }
  ]
})

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const session = getSession()
  if(!session.user){
    session.redirectURL = to.fullPath
    next('/home')
  }
  else{
    next()
  }
}


export default router
