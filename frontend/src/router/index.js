import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/pagelist/dashboard'
import TaxCollection from '@/pagelist/taxation/tax_collection'
import Taxation from '@/pagelist/taxation/taxation'
import AddAssesment from '@/pagelist/assesment/add_assesment'
import Assesment from '@/pagelist/assesment/assesment'
import Login from '@/pagelist/login'
import Logout from '@/pagelist/logout'
import store from '../store/store'
Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/addassesment',
      name: 'AddAssesment',
      component:AddAssesment,
      meta: { requiresAuth: false }
    },
    {
      path: '/assesment',
      name: 'Assesment',
      component:Assesment,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component:Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component:Logout
    },
    {
      path: '/taxation',
      name: 'Taxation',
      component:Taxation,
      meta: { requiresAuth: false }
    },
    {

      path: '/tax_collection',
      name: 'TaxCollection',
      component:TaxCollection,
      meta: { requiresAuth: false }
    }
  ],
  mode:"history"
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})




export default router;
