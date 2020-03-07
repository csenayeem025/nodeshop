import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import home from '@/components/views/home'
import login from '@/components/views/login'
import navigators from '@/components/views/navigator'
import search from '@/components/views/search'
import checkout from '@/components/views/checkout'
import myorders from '@/components/views/myorders'
import invoice from '@/components/views/invoice'
import help from '@/components/views/help'
import auth from '@/components/views/Auth'
import popular from '@/components/views/popular'
import special from '@/components/views/special'
import discount from '@/components/views/discount'
import profile from '@/components/views/profile'

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
	{
	    name: 'orders',
	    path: '/my-orders',
	    component: myorders
	},
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
		name: 'profile',
		path: '/profile',
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