<template>
	<div class="navigator">

    <div class="custom-container">
      <div class="row slider-layout-4">
        <div class="col-10 slider-slide ">

		<div class="banner" style="margin-top: 10px;">
			<div class="">
				<figure class="image" v-if="banner.length !== null">
					<img :src="banner.image" alt="" >
				</figure>
			</div>
		</div>
		<!-- ./banner -->



		<nav class="breadcrumb has-succeeds-separator is-small breadcrumb-modifier" aria-label="breadcrumbs" style="margin-top: 10px;">
		  <ul>
		    <li v-for="(bread,index) in breadcrumb" :class="{'is-active' : index === breadcrumb.length - 1}" :key="index"><router-link tag="a" :to="{path: '/navigate/'+formatLink(bread)}">{{bread}}</router-link></li>
		  </ul>
		</nav>
		<!-- ./breadcrumb -->


		<div class="columns" style="margin-top: 20px;">
	      <div class="column has-text-centered">
	          <p class="is-uppercase title-text has-text-black">{{formatBrand($route.params.uri)}}</p>
	          <span class="title-modifier"></span>
	      </div>
	    </div>
		<!-- ./titling -->

		<div class="columns is-mobile is-multiline" v-if="items.node === 'inode' ">
			<div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd is-cursor-pointer" v-for="(child,index) in items.children" :key="index">
				<router-link tag="div" :to="{path: '/navigate/'+formatLink(child.child)}">
					<div class="card inode">
						<div class="card-image">
							<figure class="image is-4by3">
								<img :src="child.image" alt="">
							</figure>
						</div>
						<div class="card-content has-text-centered">
							<small>{{child.child}}</small>
						</div>
					</div>
				</router-link>
			</div>
		</div>

		<!-- ./inode -->



		<div class="columns is-mobile is-multiline" v-else>
			<div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(product,index) in products" :key="index" style="margin-bottom: 20px;">
				<product :product="product"></product>
			</div>
		</div>
		<infinite-loading @infinite="loadMore" ref="infiniteLoading" spinner="spiral" v-if="items.node == 'leaf'">
	      <div slot="no-more"></div>
	    </infinite-loading>

		<!-- ./items -->

        </div>
      </div>
    </div>


	</div>
</template>

<script>
import axios from 'axios'
import product from '@/components/elements/productkit'
import InfiniteLoading from 'vue-infinite-loading'

import {mapActions} from 'vuex'


export default {

  name: 'navigator',

  data () {
    return {
		breadcrumb:[],
		items:[],
		banner: {},
		openModal: false,
		width: 1000,
		title: 'some text',
		products: [],
		more: true,
    headful:{
      title: this.$route.params.uri+" | grocery",
      description: 'A grocery shop where you can buy your daily needs'
    }

	}
  },
  mounted(){
  	//this.getPath(),
  	this.getItems()
    const head = {
      title: this.$route.params.uri+" | grocery",
      description: "This is a grocery shop"
    }
    this.setHead(head)
  },
  watch:{

  	//'$route' : 'getItems'
  	$route(){
  		this.headful.title = this.$route.params.uri + " | grocery"
      var self = this
  		this.getItems()
  		this.products = []
  		if(this.items.node === 'leaf'){
	  		this.$nextTick(()=>{
	  			self.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
	  		})
  		}

      const head = {
        title: this.$route.params.uri+" | grocery",
        description: "This is a grocery shop"
      }
      this.setHead(head)


  	}
  },
  components:{
    product,InfiniteLoading
  },
  computed:{

  },
  methods:{

  	...mapActions([
  		'setMasterLoading',
      'setHead'
  	]),


  	getItems(){
  		var self = this

  		this.setMasterLoading(true)

  		axios.get(this.$host+'items/'+this.$route.params.uri)
  		.then(response=>{
  			self.items = response.data
  			self.breadcrumb = response.data.path
        	self.banner = response.data.banner
        	self.setMasterLoading(false)
  		})
  	},
  	loadMore($state){
  		var self = this

  		axios.get(this.$host+'items/'+this.$route.params.uri,{
  			params: {
  				page: Math.floor(this.products.length / this.$perPage)+1
  			}
  		})
  		.then(response=>{

  			if(response.data.product.data.length){
  				console.log('infinite ')
  				console.log(response.data.product.data)
  				self.products = self.products.concat(response.data.product.data)
  				$state.loaded()
  				let product = response.data.product

  				if(product.current_page >= product.last_page){
  					$state.complete()
  				}

  			}else{
  				$state.complete()
  			}
  		})
  	},
    addToCart(product){
      this.$store.dispatch('setCart',product)
    },
    formatBrand(brand){
      return brand.split("-").join(" ")
    },
    formatLink(link){
      return link.split(" ").join("-")
    }
  }
}
</script>

<style lang="css" scoped>


	.breadcrumb-modifier{
		background: #eee;
		padding: 5px;
	}

	.inode{
		min-height: 250px;
	}
</style>
