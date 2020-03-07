<template>
	<div class="columns is-mobile" style="margin-top: 10px;">
		<div class="column">
			<div class="message is-danger" v-show="orders.length <= 0">
				<div class="message-body has-text-centered">
					No order placed yet! Start shopping please.
				</div>
			</div>

			<div class="card m-b-10" v-for="(order,index) in orders" 
			:key="index" 
			:class="{'is-selected': activeId === order.cart_id}"
			@click="details(order.cart_id)"
			style="cursor:pointer;">
				<div class="card-header">
					<div class="columns is-mobile is-multiline">
						<div class="column is-half">
							<span class="tag is-success" v-if="order.sell === 1">Completed</span>
							<span class="tag is-danger" v-else>Processing</span><br>

							<small>Order <strong>{{order.cart_id}}</strong></small><br>
							<small><strong><i class="icofont icofont-cur-taka"></i>{{order.total}}</strong></small>		
							
							
						</div>
						<!-- ./left column -->

						<div class="column has-text-right">
							<div class="has-text-center" v-if="order.sell === 0">
								<strong>Delivery date: </strong> <span>{{order.start}}</span>
							</div>
							<div class="has-text-center" v-else>
								<div class="star">
									<span class="icofont icofont-star" :class="{ 'has-text-warning':star >= 1 }"></span>
									<span class="icofont icofont-star" :class="{ 'has-text-warning':star >= 2 }"></span>
									<span class="icofont icofont-star" :class="{ 'has-text-warning':star >= 3 }"></span>
									<span class="icofont icofont-star" :class="{ 'has-text-warning':star >= 4 }"></span>
									<span class="icofont icofont-star" :class="{ 'has-text-warning':star >= 5 }"></span>
								</div>
								<span>{{order.cart_id}}</span><br>
								<small style="font-size:73%;">{{order.start}}</small>
								<br>
								<a href="#" class="button is-dark is-small is-outlined"><i class="icofont icofont-warning"></i> Report issue</a>

							</div>
						</div>
						<!-- ./right column -->
					</div>
				</div>
				<!-- ./card header -->

				<div class="card-content" v-if="activeId === order.cart_id">
					<simple-spinner v-if="loading_details"></simple-spinner>
					<div class="cart-details" v-else-if="getDetails.length > 0 && !loading_details">
						<router-link tag="a" :to="{path: '/invoice/' + cartid}" class="button is-outlined is-dark is-small is-pulled-right" target="_blank">
							<span class="icon">
								<i class="icofont icofont-paper"></i>
							</span>
							<span>invoice</span>
						</router-link>

						<table class="table is-fullwidth is-hoverable is-striped">
							<tr v-for="(ordr, indx) in getDetails" :key="indx">
								<td>
									<figure class="image is-64x64">
										<img :src="ordr.image" alt="">
									</figure>
								</td>
								<th>
									{{ordr.product.title}}
									<small>(per {{ordr.product.net}} {{ordr.product.unit}})</small>
								</th>
								<td>
									<i class="icofont icofont-cur-taka"></i>{{ordr.unit_price}}
								</td>
								<td>
									x
								</td>
								<td>
									Qty. {{ordr.quantity}}
								</td>
								<td>
									=
								</td>
								<td>
									<i class="icofont icofont-cur-taka"></i>{{ordr.quantity * ordr.unit_price}}
								</td>
							</tr>
							<tr>
								<th colspan="5"  class="has-text-right">
									Total
								</th>
								<td>
									=
								</td>
								<td>
									<i class="icofont icofont-cur-taka"></i>{{total}}
								</td>
							</tr>
						</table>

					</div>
				</div>
				<!-- ./card-content	 -->

				<div class="card-footer has-text-centered">
					<div class="card-footer-item">
						<span class="" v-if="indicator === order.cart_id"><i class="icofont icofont-circled-up"></i> Hide details</span>
						<span class="" v-else><i class="icofont icofont-circled-down"></i> View details</span>
					</div>
				</div>
				<!-- ./card-footer -->
			</div>
		</div>
		<!-- ./left half -->

	</div>
</template>

<script>

import axios from 'axios'
import SimpleSpinner from 'vue-simple-spinner'
import modal from '@/components/elements/modal'

export default {

  name: 'MyOrders',

  data () {
    return {
    	//star: 3
    	orders:[],
    	activeId:'',
    	indicator: '',
    	getDetails:[],
    	loading_details: false,
    	modalshow: false,
    	cartid:''
    }
  },
  components:{
  	SimpleSpinner,modal
  },
  methods:{	
	getRandom(limit){
	  return Math.floor(Math.random() * limit)
	},
	setConfig(){
  		const AUTH_TOKEN = 'Bearer '.concat(this.$cookie.get(this.$store.getters.getUser.email))
		const ACCEPT = 'application/json'

		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
		axios.defaults.headers.common['Accept'] = ACCEPT
  	},
	getOrders(){
		this.setConfig()
		var self = this

		axios.get(this.$host+'my-orders')
		.then(response=>{
			self.orders = response.data

		})
	},
	details(cart){

		this.modalshow = true
		this.cartid = cart

		this.loading_details = true
		if(this.activeId === cart){
			this.activeId = ''
			this.indicator = ''

		}
		else{
			this.activeId = cart
			this.indicator = cart
		}

		this.setConfig()
		var self = this

		axios.get(this.$host+'order-details/'+cart)
		.then(response=>{
			
			if(self.activeId === ''){
				self.getDetails = []
			}else{
				self.getDetails = response.data
			}
			self.loading_details = false

		})
	}

  },
  computed:{
  	star(){
  		return this.getRandom(4)+1
  	},
  	total(){
  		var sum = 0
  		for(let i =0; i < this.getDetails.length ; i++){
  			sum += this.getDetails[i].product.price * this.getDetails[i].quantity
  		}
  		return sum
  	}
  },
  mounted(){

  	this.getOrders()
  }
}
</script>

<style lang="css" scoped>
	.m-b-10{
		margin-bottom: 10px;
	}
	.is-selected{
		border: 1px solid darkred;
	}

	.card-header{
		display: block !important;
		padding: 20px;
	}
</style>