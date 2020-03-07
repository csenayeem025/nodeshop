<template>
	<div class="product-details">


		<div class="columns ">
			<div class="column is-half image-holder">

				<figure class="">
					<img :src="selectedImage.image.link" alt="">
				</figure>
				<div class="baseline" v-show="images.length > 1">
					<span class="baseline-image" v-for="(image,index) in images" :key="index"
					@click.stop="changeImageView(image)">
						<img :src="image.link" :class="{'is-selected': selectedImage.image.id === image.id}">
					</span>

				</div>
			</div>
			<div class="column">
				<div class="content">
					<span class="subtitle">{{product.title}} {{product.adjective}}</span>
					<span class="is-pulled-right">
						<simple-spinner v-if="rateLoading"></simple-spinner>
					</span>
					<br>
					<small>{{product.net}} {{product.unit}}</small><br><br>
					<div class="rating">
						<small>Rate this product</small><br>
						<span class="icofont icofont-star icofont-1p5x"
						:class="{'has-text-danger' : rate >= 1}"
						@mouseenter="rate = 1"
						@mouseleave="rate = product.rate"
						@click.stop="rateThis(1)"></span>

						<span class="icofont icofont-star icofont-1p5x"
						:class="{'has-text-danger' : rate >= 2}"
						@mouseenter="rate = 2"
						@mouseleave="rate = product.rate"
						@click.stop="rateThis(2)"></span>

						<span class="icofont icofont-star icofont-1p5x"
						:class="{'has-text-danger' : rate >= 3}"
						@mouseenter="rate = 3"
						@mouseleave="rate = product.rate"
						@click.stop="rateThis(3)"></span>

						<span class="icofont icofont-star icofont-1p5x"
						:class="{'has-text-danger' : rate >= 4}"
						@mouseenter="rate = 4"
						@mouseleave="rate = product.rate"
						@click.stop="rateThis(4)"></span>

						<span class="icofont icofont-star icofont-1p5x"
						:class="{'has-text-danger' : rate >= 5}"
						@mouseenter="rate = 5"
						@mouseleave="rate = product.rate"
						@click.stop="rateThis(5)"></span>



					</div>
					<p class="title">

						<span v-if="product.offer">
							<span>
								<i class="icofont icofont-cur-taka"></i>{{product.price}}
							</span>
							<small class="has-text-grey" style="text-decoration: line-through; font-size: 17px;">
								<i class="icofont icofont-cur-taka"></i>{{product.old_price}}
							</small>
						</span>
						<span v-else><i class="icofont icofont-cur-taka"></i>{{product.price}}</span>



						<span class="tag is-success is-uppercase is-small" v-show="product.offer !== null">
							<span v-if="product.offer < 0">
								<span>save <i class="icofont icofont-cur-taka"></i>{{product.offer*-1}}</span>
							</span>
							<span v-else>
								<span v-if="product.offer == 50">Half price</span>
								<span v-else-if="product.offer == 100">Free</span>
								<span v-else>{{product.offer}}% off</span>
							</span>
						</span>
						<!-- ./offer -->

					</p>
					<div class="columns is-mobile">
						<div class="column is-half">
							<div class="field has-addons has-addons-left">
							  <p class="control">
							    <button class="button is-dark is-outlined is-large" @click.prevent="downCount(product.id)">
							    	<span class="icofont icofont-ui-remove"></span>
							    </button>
							  </p>
							  <p class="control">
							    <!-- <input type="text" class="input is-large has-text-centered bag" value="0"> -->
							    <div class="is-large has-text-centered bag">
							    	<strong class="is-block">
							    		{{product.count || 0}}
							    	</strong>
							    	<small class="is-size-6 is-block" style="font-size: 10px!important; display: block!important;">in bag</small>
							    </div>
							  </p>
							  <p class="control">
								<button class="button is-dark is-outlined is-large" @click.prevent="setCart(product)" v-if="!product.hasOwnProperty('count') || product.count === 0">
							    	<span class="icofont icofont-ui-add"></span>
							    </button>
								<button class="button is-dark is-outlined is-large" @click.prevent="upCount(product.id)" v-else>
							    	<span class="icofont icofont-ui-add"></span>
							    </button>
							  </p>
							</div>
						</div>
						<div class="column">
							<button class="button is-large is-danger" @click.prevent="buyNow(product)">
								Buy Now
							</button>
						</div>
					</div>
					<!-- ./add to bag -->
					<hr>
					<div class="columns">
						<div class="column description">
							<p>
								{{product.description}}
							</p>
						</div>
					</div>
					<!-- ./description -->

				</div>
			</div>
		</div>

		<div class="columns is-mobile detail-footer">
			<div class="column is-half">
				<div>
					<i class="fa fa-money"> Cash On Delivery</i>&nbsp;&nbsp;&nbsp;
					<i class="fa fa-shopping-cart"> 1 Hour Delivery</i>
				</div>
				<div class="m-t-20">
					<p class="title">Grocery</p>
					<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ex voluptate sequi atque praesentium suscipit, corporis omnis voluptatum assumenda unde molestiae voluptas provident, in aperiam odit blanditiis ipsam, recusandae ad.</small>
				</div>

			</div>
			<!-- ./left column -->
			<div class="column">
				<div>
					<figure class="image">
						<img src="https://www.itbazaar.com.bd/public/assets/images/payment.jpg" alt="">
					</figure>
				</div>

			</div>
			<!-- ./right column -->
		</div>

	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import _ from 'lodash'
import SimpleSpinner from 'vue-simple-spinner'



export default {

  name: 'productdetails',
  props: ['product'],
  components:{
  	SimpleSpinner
  },
  data () {
    return {
    	images: this.product.image,
    	selectedImage: {
    		image: this.product.image[0]
    	},
    	rateLoading: false,
    	rate: 0

    }
  },
  filters:{
  	firstHundrad: (value)=>{
  		if(value.length <= 100){
  			return value
  		}
  		let str = ""

  		for(let i = 0; i < 100; i++){
  			str += value[i]
  		}
  		return str+"..."
  	}
  },
  mounted(){
  	this.rate = this.product.rate
  	//this.headful.title = this.product.title + ' | grocery'
  },
  computed:{

  },
  watch:{
  	product(){
  		this.rate = this.product.rate
  	}
  },
  methods:{
  	...mapActions([
  		'upCount',
  		'downCount',
  		'setCart',
  		'showcart'
  	]),
  	changeImageView(image){
  		this.selectedImage.image = image
  	},
  	buyNow(product){
  		if(!product.hasOwnProperty('count') || product.count === 0){
  			this.setCart(product)
  		}
  		this.$parent.$emit('update:show',false)
  		this.showcart()
  	},
	moderatedPrice(price,offer){
		var commission = price * (offer / 100)
		return price - commission
  	},
  	rateThis(rate){
  		this.rateLoading = true
  		var self = this
  		var product_id = this.product.id
  		const data = {
  			product_id : product_id,
  			rate: rate,
  			browser_id: this.$cookie.get('browser_id')
  		}
  		axios.post(this.$host+'set-rating',data)
  		.then(response => {
  			console.log(response)
  			self.product.rate = response.data.rate
  			self.rateLoading = false
  		})
  	}
  }
}
</script>

<style lang="css" scoped>
	.bag{
	    border-top: 1px solid #000 !important;
	    border-bottom: 1px solid #000 !important;
	    margin-left: 2px!important;
	    padding-left: 10px;
	    padding-right: 10px;
	    height: 54px;
	    width: 200px;
	    padding-top: 5px;
	}


	.description{
		max-height: 200px;
		overflow-y: auto;
	}

	.detail-footer{
		background: #eee;
	}

	.image-holder{
		height: 450px;
		background-repeat: no-repeat;
	    -webkit-background-size: contain;
	    background-size: contain;
	    background-position: center;
	    position: relative;
	}

	.image-holder > figure > img{
	    max-height: 75%;
	    max-width: 100%;
	    width: auto;
	    height: auto;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	}

	.offer{
		max-height: 20px;
	}

	.baseline{
		position: absolute;
		text-align: center;
		bottom: 0;
		left: 30%;
	}
	.baseline span{
		margin-right: 20px;
		cursor: pointer;

	}

	.baseline img{
		width: 40px;
		height: 40px;
		border: 2px solid #ccc;
		border-radius: 50%;

	}

	.is-selected{
		border: 2px solid #FF003F !important;
	}

	.rating > span{
		cursor: pointer;
	}
</style>
