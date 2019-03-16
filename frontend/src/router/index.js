import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/pagelist/dashboard'
import TaxCollection from '@/pagelist/taxation/tax_collection'
import Taxation from '@/pagelist/taxation/taxation'
import AddProperty from '@/pagelist/property/add_property'
import ManageAyear from '@/pagelist/manageayear'
import Property from '@/pagelist/property/property'
import Login from '@/pagelist/login'
import Logout from '@/pagelist/logout'
import StudentList from '@/components/StudentList'


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
      path:'/reporttest',component:StudentList
    },
    {
      path: '/addproperty/:id?',
      name: 'AddProperty',
      component:AddProperty,
      meta: { requiresAuth: true }
    },
    {
      path: '/property',
      name: 'Property',
      component:Property,
      meta: { requiresAuth: true }
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
      meta: { requiresAuth: true }
    },
    {
      path: '/manageayear',
      name: 'ManageAyear',
      component:ManageAyear,
      meta: { requiresAuth: true }
    },
    {
      path: '/tax_collection',
      name: 'TaxCollection',
      component:TaxCollection,
      meta: { requiresAuth: true }
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
