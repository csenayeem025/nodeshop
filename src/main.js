// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import vueCookie from 'vue-cookie'
import VueCarousel from 'vue-carousel'

// import firebase from 'firebase'
// import firebaseui from 'firebaseui'


import vMediaQuery from 'v-media-query'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

import vueHeadful from 'vue-headful'





import store from '@/store'
import router from '@/router'

//window.$ = window.jQuery = require('jquery')



import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/icofont/css/icofont.css'
import '@/assets/css/animate.css'
// import 'firebaseui/dist/firebaseui.css'

Vue.use(Vuex)
Vue.use(vMediaQuery)
Vue.use(vueCookie)
Vue.use(VueLodash, lodash)
Vue.use(VueCarousel)
Vue.use(Notifications,{velocity})
Vue.use(require('vue-moment'));


Vue.component('vue-headful', vueHeadful)

// import config from '@/helpers/firebaseConfig'







Vue.config.productionTip = false


// var myMixin = {

//   data: function() {
//     return {
//       host:'http://adminngrocery.tk/api1/'
//     }
//   },
//   created: function () {
//     this.hello()
//   },
//   methods: {
//     hello: function () {
//       //console.log('hello from mixin! ',this.host)
//     }
//   }
// }

// define a component that uses this mixin
// var Component = Vue.extend({
//   mixins: [myMixin]
// })


Vue.prototype.$host_domain = 'http://admin.onlinebigbazaar.com'
//Vue.prototype.$host_domain = 'http://127.0.0.1:8000'
Vue.prototype.$host = Vue.prototype.$host_domain+'/api/'
Vue.prototype.$converter = require('number-to-words')
Vue.prototype.$perPage = 20
Vue.prototype.$first = (list)=>{
	return list[0]
}

/*Vue.prototype.$converter = require('number-to-words')*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  props:['myMixin'],
  created(){
  	//firebase.initializeApp(config)
    //console.log('hello from app! ',this.host)
  },
  components: { App },
  template: '<App/>'
})
