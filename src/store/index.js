import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		navshow: true,
		cartshow: false,
		menus: [],
	    products: [],
	    searched: [],
	    cart: [],
	    viewCart: false,
	    breadcrumb:[],
	    activeSearch: false,
	    guser: {},
	    showModal: false,
	    invoice: false,
	    dance: false,
	    masterLoading: false,
	    notification: {
	    	group: 'groce',
	    	title: 'Hello',
	    	text: 'world',
	    	type: 'vue-notification success'
	    },
	    headful: {
	    	title: 'grocery',
	    	description: 'This is a grocery shop'
	    }
	},
	plugins:[createPersistedState()],
	getters: {
		getHead: (state) => {
			return state.headful
		},
		navshow: (state) => {
			return state.navshow
		},
		cartshow: (state) => {
			return state.cartshow
		},
		getMasterLoading: (state) => {
			return state.masterLoading
		},
		getMenus(state){
	      return state.menus
	    },
	    getProducts: state => {
	      return state.products
	    },
	    getCart: state =>{
	      return state.cart
	    },
	    getCartView: state =>{
	      return state.viewCart
	    },
	    getBreadcrumb: state => {
	      return state.breadcrumb
	    },
	    getSearchStatus: state => {
	      return state.activeSearch
	    },
	    getSearched: state => {
	      return state.searched
	    },
	    getUser: state => {
	      return state.guser
	    },
	    authCheck: state => {
	      if(Object.keys(state.guser).length > 0) return true
	        return false
	    },
	    modalMode: state => {
	      return state.showModal
	    },
	    getInvoice: state =>{
	      return state.invoice
	    },
	    getCartById: (state) => (id) => {
		  return state.cart.find(c => c.id === id)
		},
		getDance: (state) =>{
			return state.dance
		},
		getNotification: (state) => {
			return state.notification
		}

	},
	mutations: {
		togglenav:(state) => state.navshow = !state.navshow,
		togglecart:(state) => state.cartshow = !state.cartshow,
		setMasterLoading: (state,payload) => state.masterLoading = payload,
		showcart: (state) => state.cartshow = true,
		hidecart: (state) => state.cartshow = false,
		changesideshow: (state,payload) => state.navshow = payload,
	    setMenus: (state, payload) => state.menus = payload,
	    setProducts: (state, payload) => {
	      state.products = payload

	    },
	    setSearched: (state,payload) => {
	      state.searched = payload
	    },
	    setActiveSearch: (state,payload) => state.activeSearch = payload,
	    setCart: (state, payload) => {
	      var item = state.cart.find(value => value.id === payload.id)

	      //state.viewCart = true
	      state.dance = true

	      if( item ){
	        item.count++
	        Vue.set(item,'count',item.count)
	      }else{
	        state.cart.push(payload)
	        Vue.set(payload,'count',1)
	      }
	      setTimeout(function(){state.dance = false},1000)


	    },
	    removeItem: (state, payload) => {
	      //state.cart = payload
	      state.dance = true
	      var item = state.cart.find(response => response.id === payload)
	      var index = state.cart.indexOf(item)
	      state.cart.splice(index,1)
	      setTimeout(function(){state.dance = false},1000)
	    },
	    upCount: (state,payload) =>{
	      
	      state.dance = true
	      var item = state.cart.find(response => response.id === payload)
	      if(item){
	        item.count++
	      }

	      setTimeout(function(){state.dance = false},1000)
	    },
	    downCount: (state,payload) => {
	    	state.dance = true
	      var item = state.cart.find(response => response.id === payload)
	      var index = state.cart.indexOf(item)

	      if(item){
	      	if(item.count > 0){
	        	item.count--
	      	}
	      	if(item.count === 0){
	      		state.cart.splice(index,1)
	      	}
	      }
	      setTimeout(function(){state.dance = false},1000)
	      
	    },
	    evacuateUser: state => {
	    	
	      state.guser = {}
	    },
	    toggleCart: state => state.viewCart = !state.viewCart,
	    setCartView: (state,payload) => state.cartView = payload,
	    evacuateCart: (state) =>{
	      state.cart.splice(0, state.cart.length)
	    },
	    setBreadcrumb: (state,payload) => state.breadcrumb = payload,
	    setUser: (state,payload) => state.guser = payload,
	    setModalMode: (state,payload) => state.showModal = payload,
	    setInvoice: (state,payload) => state.invoice = payload,
	    setDance: (state,payload) => state.dance = payload,
	    setCartShow: (state,payload) => state.cartshow = payload,
	    setNotification: (state,payload) => state.notification = payload,
	    setHead: (state,payload) => state.headful = payload
	},
	actions: {
		togglenav: (context) => context.commit('togglenav'),
		togglecart: (context) => context.commit('togglecart'),
		setMasterLoading: (context,payload) => context.commit('setMasterLoading',payload),
		showcart: (context) => context.commit('showcart'),
		hidecart: (context) => context.commit('hidecart'),
		changesideshow: (context,payload) => context.commit('changesideshow',payload),
		setMenus: (context, payload) => context.commit('setMenus',payload),
	    setProducts(context, payload){
	      context.commit('setProducts',payload)
	    },
	    setCart: (context, payload) => {
	      context.commit('setCart',payload)
	    },
	    removeItem: (context, payload) => {
	      context.commit('removeItem',payload)
	    },
	    upCount: (context,payload) => context.commit('upCount',payload),
	    downCount: (context, payload) => context.commit('downCount', payload),
	    setBreadcrumb: (context,payload) => context.commit('setBreadcrumb',payload),
	    setActiveSearch: (context,payload) => context.commit('setActiveSearch',payload),
	    setSearched: (context,payload) => context.commit('setSearched',payload),
	    setUser: (context,payload) => context.commit('setUser',payload),
	    evacuateUser: (context) => context.commit('evacuateUser'),
	    setModalMode: (context,payload) => context.commit('setModalMode',payload),
	    setInvoice: (context,payload) => context.commit('setInvoice',payload),
	    evacuateCart: (context) => {context.commit('evacuateCart')},
	    setDance: (context,payload) => context.commit('setDance',payload),
	    setCartShow: (context,payload) => context.commit('setCartShow',payload),
	    setNotification: (context,payload) => context.commit('setNotification',payload),
	    setHead: (context,payload) => context.commit('setHead',payload)
	}
})

export default store