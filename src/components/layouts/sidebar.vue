<template>

	<aside class="menu c-space is-active is-fixed-sidebar" id="sidebar">
		<modal :show.sync="showmodal" modifiers="is-small">
			<requests></requests>
		</modal>
		<div class="menu-wraper">

			<ul class="menu-list">
				<li>
					<a href="">Coupons</a>
				</li>
				<li>
					<router-link tag="a" :to="{name: 'offers'}" :class="{'has-text-danger' : $route.name === 'offers'}">
						<span>Offers</span>
						<small class="tag is-danger is-small is-outlined">{{offer}}</small>
					</router-link>
				</li>
				<li>
					<router-link tag="a" :to="{name: 'discount'}">
						Discount
					</router-link>
				</li>
				<li>
					<a @click.prevent="showmodal = true">
						Product Request
					</a>

				</li>
				<li>
					<a href="">Referral</a>
				</li>
			</ul>

			<hr>
			<ul class="menu-list">
			    <li>
			    	<router-link tag="a" :to="{name: 'popular'}" :class="{'has-text-danger' : $route.name === 'popular'}">
			    		<span class="icon">
			    			<i class="icofont icofont-ui-rate-blank icofont-1p5x"></i>
			    		</span>
			    		<span>Popular</span>
			    	</router-link>
			    </li>
			</ul>

			<ul class="menu-list" style="flex-grow:1;">
				<li v-for="(menu,index) in menus" :key="index" @click.stop="toggle(menu)" >
					<router-link tag="a"
					:to="{path: '/navigate/'+formatMenu(menu.name)}" :class="{'has-text-danger has-text-weight-bold' : activate(menu.name)}">
						<span>
							<span style="overflow-x: hidden;">
								<span class="icon">
									<i :class="renderIcon(menu.name)"></i>
								</span>
								{{menu.name}}
							</span>
							<span class="icon is-pulled-right" v-if="menu.children && menu.children.length">
						  		<i class="icofont icofont-simple-right" v-if="!menu.expanded"></i>
						  		<i class="icofont icofont-simple-down" v-else></i>
					  		</span>
						</span>
					</router-link>

					<ul class="menu-list" v-if="menu.children && menu.children.length && menu.expanded">
						<li v-for="(submenu,subindex) in menu.children"
						:key="subindex" @click.stop="toggle(submenu)">
							<router-link tag="a" :to="{path: '/navigate/'+formatMenu(submenu.name)}"
							:class="{'has-text-danger has-text-weight-bold' : activate(submenu.name)}">
								<span>{{submenu.name}}</span>
								<span class="icon is-pulled-right" v-if="submenu.children && submenu.children.length">
							  		<i class="icofont icofont-simple-right" v-if="!submenu.expanded"></i>
							  		<i class="icofont icofont-simple-down" v-else></i>
						  		</span>
							</router-link>
							<ul class="menu-list" v-if="submenu.children && submenu.children.length && submenu.expanded">
								<li v-for="(leaf,leafindex) in submenu.children" :key="leafindex"  @click.stop>
									<router-link tag="a" :to="{path: '/navigate/'+formatMenu(leaf.name)}" :class="{'has-text-danger has-text-weight-bold' : activate(leaf.name)}">
										<span>{{leaf.name}}</span>
									</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import modal from '@/components/elements/modal'
import requests from '@/components/views/requests'
import _ from 'lodash'

export default {

  name: 'sidebar',

  data () {
    return {
    	icons:[
    		{
    			name: 'Food',
    			icon: 'icofont icofont-fast-food icofont-1p5x'
    		},
    		{
    			name: 'Home and Cleaning',
    			icon: 'icofont icofont-under-construction-alt icofont-1p5x'
    		},
    		{
    			name: 'Office Products',
    			icon: 'icofont icofont-clip icofont-1p5x'
    		},
    		{
    			name: 'Baby care',
    			icon: 'icofont icofont-baby icofont-1p5x'
    		},
    		{
    			name: 'Beauty and Health',
    			icon: 'icofont icofont-brush icofont-1p5x'
    		},
    		{
    			name: 'Pet Care',
    			icon: 'icofont icofont-animal-cat-alt-4 icofont-1p5x'
    		},
    		{
    			name: 'Home Appliances',
    			icon: 'icofont icofont-washing-machine icofont-1p5x'
    		}

    	],
    	offer:0,
    	showmodal: false
    }
  },
  mounted(){
  	this.getCategories()
  	this.offerCategory()
  	//this.traverseMenus()

  },
  watch:{
  	//'$route' : 'activate'
  },
  components:{
  	modal,requests
  },
  methods:{
  	getCategories(){
		var self = this
		axios.get(this.$host+'get-categories')
		.then(response => {
		  console.log(response.data)
		  //self.menus = response.data
		  self.$store.dispatch('setMenus',response.data)
		})
	},
	formatMenu(menu){
	    return menu.split(" ").join("-")
  	},
  	revertMenu(menu){
  		return menu.split("-").join(" ")
  	},
  	toggle(menu){
  		console.log('Indi menu: ')
  		console.log(menu)
  		menu.expanded = !menu.expanded
  		this.traverseMenus(menu)

  	},
  	activate(uri){
  		if(this.$route.params.uri){
	  		if(this.revertMenu(this.$route.params.uri) === uri){
	  			return true
	  		}
	  		return false
	  	}else{
	  		return false
	  	}
  	},
  	findObject(node, name) {

  		if(node.name === name){
  			return node
  		}
  		for(let i = 0; i < node.children.length ; i++ ){
  			let result = this.findObject(node.children[i], name)
  			if(result){
  				return result
  			}
  		}
  		return null
	},
	renderIcon(name){
		let icon = this.icons.find(value => value.name.toLowerCase() === name.toLowerCase())
		return icon.icon
	},
	offerCategory(){
		var self = this

  		axios.get(this.$host+'offer-categories')
  		.then(response => {
  			var sum = 0
  			for(let i = 0; i < Object.keys(response.data).length; i++ ){
  				sum += response.data[i].count
  			}
  			self.offer = sum
  		})
	},
	isAncestor(menu,val){
		if(val.parent === menu.name){
			return true
		}else{
			if(menu.children && menu.children.length){
				var self = this
				_.forEach(menu,(value,key) =>{
					self.isAncestor(value,val)

				})
			}
			return false
		}
	},
	collapse(menu,val){
		if(menu.name !== val.name){
			if(!this.isAncestor(menu,val)){

				menu.expanded = false

			}
			if(menu.children && menu.children.length){
				var self = this
				_.forEach(menu.children, (value, key) => {
					self.collapse(value,val)
				})
			}
		}
	},
	traverseMenus(menu){
		console.log("Display menus")
		var self = this
		_.forEach(this.menus, (value, key) => {
			self.collapse(value,menu)
		})
	}

  },
  computed: {
  	...mapGetters({
  		navshow: 'navshow',
  		menus: 'getMenus'
  		})
  }
}
</script>

<style lang="css" scoped>



	.menu{
		font-size: 13px;
	}
	.is-collapsed{
		display: none;
	}

	#sidebar{
		margin-top: 52px;
		z-index: 2;

		font-family: 'Ubuntu', sans-serif;
		/*background: #F0F0F4;*/
		background: #fff;
		border-right: 1px solid #ddd;



	}

	.is-fixed-sidebar{
		position: fixed;
		top: 0px;
		left: 0;
		width: 275px;
		bottom: 0;

	}

	.menu-wraper{
		/*height: 90vh;*/
		height: 100%;
		overflow-y: auto!important;
		overflow-x: hidden;
	}

	li > a{
		overflow-x: hidden;
		width: 100%!important;
	}

	.menu-list, .menu-list li, .menu-list li a{
		flex-grow: 1!important;
		width: 100%!important;
	}

	.menu-list .icon i{
		margin-top: -10px;
	}

	.tag.is-outlined{
		background: none !important;
		border: 1px solid #FF004D !important;
		color: #FF004D !important;
		height: 18px;
		min-width: 15px!important;
	}



  aside::-webkit-scrollbar {
    width: 5px;
    background: none!imporant;
    border:none!imporant;

  }


  aside::-webkit-scrollbar-track {
    display:none;
    background: none;
    border: none;
  }

  aside::-webkit-scrollbar-thumb {
    outline: 1px solid slategrey;
    border-radius: 10px;
    border:none;
    background: rgba(0,0,0,0.4);
  }

</style>
