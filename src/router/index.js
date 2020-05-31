import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VeeValidate)

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import home from '@/components/views/home'
import login from '@/components/views/login'
import register from '@/components/views/register'
import register_vendor from '@/components/views/register-vendor'
import thank_you from '@/components/views/register-thankyou'
import email_confirmation from '@/components/views/email-confirmation'
import forget_pwd from '@/components/views/forget-pwd'
import set_new_pwd from '@/components/views/set-new-pwd'
import navigators from '@/components/views/navigator'
import search from '@/components/views/search'
import checkout from '@/components/views/checkout'
//import myorders from '@/components/views/myorders'
import invoice from '@/components/views/invoice'
import help from '@/components/views/help'
import auth from '@/components/views/Auth'
import popular from '@/components/views/popular'
import special from '@/components/views/special'
import discount from '@/components/views/discount'
import dashboard from '@/components/views/users/dashboard'
import myaccount from '@/components/views/users/myaccount'
import addressbook from '@/components/views/users/addressbook'
import myorders from '@/components/views/users/myorders'
import mywishlist from '@/components/views/users/mywishlist'
import changepassword from '@/components/views/users/changepassword'
import profile from '@/components/views/users/profile'

import blog from '@/components/views/blog'
import hot_deals from '@/components/views/hot_deals'
import feature_products from '@/components/views/feature_products'
import contact from '@/components/views/contact'


const routes = [
	{
		name: 'home',
		path: '/',
		component: home
	},
	{
		name: 'blog',
		path: '/blog',
		component: blog
	},
	{
	    name: 'feature-products',
	    path:'/feature-products',
	    component: feature_products
	},
	{
	    name: 'hot-deals',
	    path:'/hot-deals',
	    component: hot_deals
	},
	{
	    name: 'login',
	    path:'/login',
	    component: login
	},
  {
    name: 'register',
    path:'/register',
    component: register
  },
  {
    name: 'register-vendor',
    path:'/register-vendor',
    component: register_vendor
  },
  {
    name: 'thank-you',
    path:'/thank-you',
    component: thank_you
  },
  {
    name: 'email-confirmation',
    path:'/email-confirmation',
    component: email_confirmation
  },
  {
    name: 'forget-pwd',
    path:'/forget-pwd',
    component: forget_pwd
  },
  {
    name: 'newpassword',
    path:'/newpassword',
    component: set_new_pwd
  },
	{
	    name: 'navigate',
	    path: '/navigate/:uri',
	    component: navigators
	},
	{
	    name: 'search',
	    path: '/search/:item',
	    component: search
	},
	{
	    name: 'checkout',
	    path: '/checkout',
	    component: checkout
	},
	// {
	//     name: 'orders',
	//     path: '/my-orders',
	//     component: myorders
	// },
	{
	    name: 'invoice',
	    path: '/invoice/:oid',
	    component: invoice
	},
	{
		name: 'help',
		path: '/help',
		component: help
	},
	{
		name: 'auth',
		path: '/auth',
		component: auth
	},
	{
		name: 'popular',
		path: '/popular',
		component: popular
	},
	{
		name: 'offers',
		path: '/offers',
		component: special
	},
	{
		name: 'discount',
		path: '/discount',
		component: discount
	},
  {
    name: 'dashboard',
    path: '/dashboard',
    component: dashboard
  },
	{
		name: 'myaccount',
		path: '/myaccount',
		component: myaccount
	},
  {
    name: 'addressbook',
    path: '/addressbook',
    component: addressbook
  },
  {
    name: 'myorders',
    path: '/myorders',
    component: myorders
  },
  {
    name: 'mywishlist',
    path: '/mywishlist',
    component: mywishlist
  },
  {
    name: 'changepassword',
    path: '/changepassword',
    component: changepassword
  },
  {
    name: 'profile',
    path: '/profile/:id',
    component: profile
  },
	{
		name: 'contact',
		path: '/contact',
		component: contact
	}


]

const router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition){
		if (savedPosition) {
		  return savedPosition
		} else {
		  return { x: 0, y: 0 }
		}
	}
})

export default router
