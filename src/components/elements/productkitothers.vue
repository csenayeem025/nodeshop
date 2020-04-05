<template>
	<div class="item" v-if="product.id>=83">
		<div class="hb">
			<div class="item-heading">

				<figure class="is-product">
<!--					<img :src="image" alt="">-->
          <img v-if="product.id==207" :data-productid="product.id" src="/static/assets/uploads/women-tops/tops-1.jpg" alt="">
          <img v-if="product.id==206" :data-productid="product.id" src="/static/assets/uploads/women-tops/tops-2.jpg" alt="">
          <img v-if="product.id==93" :data-productid="product.id" src="/static/assets/uploads/women-tops/tops-3.jpg" alt="">
          <img v-if="product.id==84" :data-productid="product.id" src="/static/assets/uploads/women-tops/tops-4.jpg" alt="">
          <img v-if="product.id==83" :data-productid="product.id" src="/static/assets/uploads/women-tops/tops-5.jpg" alt="">
				</figure>
				<div class="offer">
					<span class="tag is-danger is-uppercase is-small" v-show="product.offer !== null">
						<span v-if="product.offer < 0">
							<span>save <i class="icofont icofont-cur-taka"></i>{{product.offer*-1}}</span>
						</span>
						<span v-else>
							<span v-if="product.offer == 50">Half price</span>
							<span v-else-if="product.offer == 100">Free</span>
							<span v-else>{{product.offer}}% off</span>
						</span>
					</span>
				</div>
				<!-- ./offer -->
			</div>
			<div class="item-body has-text-centered">
				<div class="name">
					<span>{{product.title}} {{product.adjective}}</span>
					<div class="rating">
						<span class="icofont icofont-star" :class="{'has-text-danger' : rate >= 1}"></span>
						<span class="icofont icofont-star" :class="{'has-text-danger' : rate >= 2}"></span>
						<span class="icofont icofont-star" :class="{'has-text-danger' : rate >= 3}"></span>
						<span class="icofont icofont-star" :class="{'has-text-danger' : rate >= 4}"></span>
						<span class="icofont icofont-star" :class="{'has-text-danger' : rate >= 5}"></span>
					</div>
				</div>
				<small>{{product.net}} {{product.unit}}</small><br>
				<strong class="has-text-danger price">

					<span v-if="product.offer">
						<span>
							<i class="icofont icofont-cur-taka"></i>{{product.price}}
						</span>
						<small class="has-text-grey" style="text-decoration: line-through; font-size: 13px;">
							<i class="icofont icofont-cur-taka"></i>{{product.old_price}}
						</small>
					</span>
					<span v-else><i class="icofont icofont-cur-taka"></i>{{product.price}}</span>

				</strong>
				<!-- ./price tag -->

			</div>
			<div class="item-shadow has-text-centered" @click="setCart(product)">
				<span class="center price" v-show="cart.count">
					<span class="">
						<i class="icofont icofont-cur-taka"></i> {{cart.count * cart.price}}
					</span>
				</span><br>
				<br>
				<span v-if="!filterCartById(product.id)">
					<b class="">Add to <br>shopping <br>bag</b>
				</span>
				<div v-else>
					<nav class="level">
						<div class="level-item">
							<span class="fa fa-minus-circle fa-double" @click.stop="downCount(cart.id)"></span>
						</div>
						<div class="level-item">
							<span class="count">{{cart.count}}</span>
						</div>
						<div class="level-item">
							<span class="fa fa-plus-circle fa-double" @click.stop="upCount(cart.id)"></span>
						</div>
					</nav>
				</div>
				<div class="details has-text-centered" @click.prevent.stop="showDetails(product)">
					<span class="has-text-danger" >Details</span>
				</div>
			</div>
		</div>
		<modal :show.sync="detailshow" modifiers="is-large">
			<product-details :product="product"></product-details>
		</modal>

		<div class="item-footer has-text-centered">
			<button class="button is-danger is-block"
			v-if="!filterCartById(product.id)"
			@click.prevent="setCart(product)">Add to bag</button>
			<div class="field has-addons has-addons-centered" v-else>
			  <p class="control">
			    <button class="button is-danger" @click.prevent.stop="downCount(cart.id)">
			    	<span class="cart-modifier">-</span>
			    </button>
			  </p>
			  <p class="control is-fullwidth">
			    <button class="button is-danger is-fullwidth" @click.prevent="setCart(product)">{{cart.count}} in bag</button>
			  </p>
			  <p class="control">
				<button class="button is-danger" @click.prevent.stop="upCount(cart.id)">
			    	<span class="cart-modifier">+</span>
			    </button>
			  </p>
			</div>
		</div>

	</div>
</template>

<script>

import modal from '@/components/elements/modal'
import productDetails from '@/components/views/productdetails'
import productdetailsothers from '@/components/views/productdetailsothers'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {

  name: 'productkit',

  props:['product'],
  data () {
    return {
    	detailshow: false,
    	cart: {},
    	image: this.product.image[0].link
    }
  },
  components:{
  	modal,productDetails,productdetailsothers
  },
  methods:{
  	...mapActions([
  		'setCart',
  		'upCount',
  		'downCount',
  		'setHead'
  	]),
  	filterCartById(id){
  		var crt = this.getCart.find(c=>{
  			return c.id === id
  		})

  		if(crt){
  			this.cart = crt
  			return true
  		}else{
  			return false
  		}

  	},
  	mapInBetween(item, in_min, in_max, out_min, out_max){
  		return (item - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
  	},
  	moderatedPrice(price,offer){
  		var commission = price * (offer / 100)
  		return price - commission
  	},
  	getRate(){
		var self = this
		var product_id = this.product.id
		axios.get(this.$host+'get-rating/'+product_id)
		.then(response => {
			console.log(response.data.rate)
			self.$set(self.product, 'rate', response.data.rate)
		})
  	},
  	showDetails(product){
  		this.detailshow = true
		const head = {
			title: product.title+" | grocery",
			description: "This is a grocery shop"
		}
      	this.setHead(head)
  	}
  },
  computed:{
  	...mapGetters([
  		'getCart'
  	]),
  	rate(){
  		return this.product.rate
  	}
  },
  mounted(){
  	console.log(this.filterCartById(0))
  	this.getRate()
  }
}
</script>

<style lang="css" scoped>

	@import url("https://fonts.googleapis.com/css?family=Kameron|Source+Sans+Pro|Montserrat|Rammetto+One|Raleway");


	.number{
		/* font-family: 'Kameron', serif; */
		font-family: 'Source Sans Pro', sans-serif;
	}

	.item-body{
		padding: 5px;
		font-family: 'Source Sans Pro', sans-serif;
		padding-top: 0;

	}

	.hb{
		position: relative;
		min-height: 305px;

	}
	.name{
		min-height: 90px;
		margin-top: 2px;
	}
	.item-shadow{
		background: rgba(0,0,0,0.7);
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 3px;
		cursor: pointer;
		display: none;
		padding-top: 20px;

	}

	.item-shadow span{
		color: #fff;
		font-size: 20px;
		vertical-align: middle;

	}

	.item-shadow .details{
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background: #eee;
		border: 1px solid #ccc;
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		min-height: 35px;
	}

	.item-shadow > .details > span{

		font-size: 12px;
		font-weight: 900;

	}

	.item-shadow > .center > b{
		font-family: 'Raleway', cursive;
	}

	.item-footer{
		margin-top: 5px;
	}

	.hb:hover .item-shadow{
		display: block;
	}

	.count{
		font-size: 45px!important;
		font-weight: 900!important;
		color: yellow!important;
	}

	.fa-double{
		font-size: 25px !important;
	}


	.is-product img{
		max-width: 150px;
	    max-height: 150px;
	    border-radius: 4px;
	    display: block;
	    margin: 0px auto;
	}

	.is-product{
		min-height: 150px;
	}

	.item-heading{
		position: relative;
	}

	.offer{
		max-height: 0px;
		position:absolute;
		left: 10px;
		bottom: 30px;
	}

	.cart-modifier{
		font-size: 17px;
    	font-weight: bold;
	}
  .button.is-danger {
    background-color: #EE1A24 !important;
    margin:0 auto;
  }
</style>
