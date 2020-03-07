<template>
	<div class="offers" style="margin-top: 20px;">

		<div class="banner">
			<div class="">
				<figure class="image" >
					<img src="@/assets/images/Offer_Page_Banner.png" alt="" >
				</figure>
			</div>
		</div>
		<!-- ./banner -->
		<br>
		
		
		<p class="subtitle">
			<span class="icon">
				<i class="icofont icofont-filter"></i>
			</span>
			<span>Filter by category</span>
			<span class="icon">
				<i class="icofont icofont-circled-down" v-if="showfilter" @click="showfilter = false"></i>
				<i class="icofont icofont-circled-up" v-else @click="showfilter = true"> </i>
			</span>
			<small>{{filter}}</small>
			<small v-show="filter !== ''">
				<div class="tag is-warning">
					Clear filter &nbsp; 
					<button class="delete" @click.prevent="getOfferProducts(null)">
						
					</button>
				</div>
			</small>
		</p>

		<div class="columns is-multiline is-multiline is-gapless" v-show="!showfilter">
			<div class="column is-one-fifth-desktop " v-for="(category,index) in categories" :key="index">
				<div class="cbox" @click.stop="getOfferProducts(category.name)">
					<small class="">{{category.name}}</small>
					<small class="">({{category.count}})</small>
				</div>
			</div>
		</div>
		<!-- ./filters -->


	    <div class="columns" style="margin-top: 20px;">
	      <div class="column has-text-centered">
	          <p class="title-text is-uppercase has-text-black">special offers</p>
	          <span class="title-modifier"></span>
	      </div>
	    </div>
		<!-- ./title bar -->

		<br>

		<div class="columns is-multiline" >
			<div class="column is-three-quarters-tablet is-three-quarters-desktop is-three-quarters-widescreen is-three-quarters-fullhd " 
			v-for="(product,index) in products" :key="index">
				<div class="card product">
					<div class="card-content">
						<div class="columns is-mobile">
							<div class="column is-7-mobile is-8-tablet is-8-desktop is-8-widescreen offer-banner" :style="{'background-image': 'url('+getImage(product)+')'}">
								<!-- <figure class="offer-banner">
									<img :src="getImage(product)" alt="">
								</figure> -->
							</div>
							<div class="column" style="border-left: 1px solid #eee;">
								<product :product="product"></product>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ./offers -->

	</div>
</template>

<script>

import axios from 'axios'
import product from '@/components/elements/productkit'
import modal from '@/components/elements/modal'
import productDetails from '@/components/views/productdetails'

import { magGetters, mapActions } from 'vuex'


export default {

  name: 'special',

  data () {
    return {
    	products: [],
    	categories: [],
    	filter: '',
    	showfilter: false
    }
  },
  components:{
  	product,modal,productDetails
  },
  mounted(){

  	this.initProducts()
  	this.initFilterCategories()
  },
  methods:{
  	initProducts(){
  		var self = this
  		this.setMasterLoading(true)

  		axios.get(this.$host+'offer-products')
  		.then(response => {
  			console.log(response)
  			self.products = response.data
  			self.setMasterLoading(false)
  		})
  	},
  	...mapActions([
  		'setMasterLoading'
  	]),

  	getImage(product){
  		let image = product.image
  		return image[0].link
  	},
  	getOfferProducts(category){
  		var self = this
  		this.setMasterLoading(true)

  		if(category !== null){
  			this.filter = " > "+category
  		}else{
  			this.filter = ""
  		}

  		axios.get(this.$host+'offer-products',{
  			params:{
  				category: category
  			}
  		})
  		.then(response => {
  			console.log(response)
  			self.products = response.data
  			self.setMasterLoading(false)
  		})
  	},
  	initFilterCategories(){
  		var self = this

  		axios.get(this.$host+'offer-categories')
  		.then(response => {
  			self.categories = response.data
  		})
  	}
  }
}
</script>

<style lang="css" scoped>
	
	.product:hover{
		transition: all .7s ease; 
		-webkit-transition:all .7s ease; 
		-webkit-box-shadow: 0px 0px 10px 0px #000000; 
		box-shadow: 0px 0px 10px 0px #000000;
	}

	.cbox{
		border: 1px solid #aaa;
		padding: 5px;
		text-align: center;
		margin-right: 2px;
		margin-bottom: 2px;
		cursor: pointer;
	}

	.cbox:hover{
		border: 1px solid rgba(255,0,0,0.5);
	}

	.offer-banner{
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0 0;

	}
</style>