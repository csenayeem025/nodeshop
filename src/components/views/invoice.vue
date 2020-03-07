<template>
	<div class="invoice">
		<div class="container">
			<!-- <div class="columns">
				<div class="column is-half">
					<p class="is-size-4 is-uppercase">grocery shop</p>	
				</div>
				<div class="column">
					<figure class="image">
						<img src="@/assets/images/gw_pay.png" alt="">
					</figure>
				</div>
			</div> -->
			<!-- ./first columns -->
			
			<div class="columns">
				<div class="column">
					<div class="block ">
						<div class="block-header hr-header row-bottom">
							<div class="columns">
								<div class="column is-9">
									<h5>Order #{{$route.params.oid}}</h5>		
								</div>
								<div class="column">
									<a href="#" class="btn btn-danger btn-block">MAKE A PAYMENT</a>	
								</div>
							</div>
						</div>

						<div class="block-body row-top">
							<div class="column">
								<div class="column has-text-centered">
									<h1 class="title">INVOICE</h1>
								</div>
							</div>
							<!-- ./invoice title -->

							<div class="columns">
								<div class="column is-6">
									<div class="invoice-to">
										<strong style="text-decoration: underline;">Invoice To:</strong><br>
										<span>{{address.name}}</span><br>
										<small>Email: {{address.email}}</small><br>
										<small>Mobile: {{address.mobile}}</small>	
									</div>
									<div class="shipping-address row-top">
										<strong style="text-decoration: underline;">Shipping Address:</strong><br>
										<span>{{address.name}}</span><br>
										<small>{{address.address}}</small><br>
										<small>{{address.area}}</small>
									</div>


								</div>
								<div class="column is-6">
									<div class="columns">
										<div class="column is-8 has-text-right">
											<small>Order no:</small><br>
											<small>Order date:</small><br>
											<small>Delivery date:</small><br>
											<small>Payment method:</small><br>
											<small>Status:</small>
										</div>
										<div class="column is-4 has-text-right">
											<small class="hast-text-right">{{$route.params.oid}}</small><br>
											<small class="hast-text-right">{{address.invoice_date}}</small><br>
											<small class="hast-text-right">{{address.delivery_date}}</small><br>
											<small class="hast-text-right">CASH</small><br>
											<span class="tag is-danger" v-if="address.status === 0">pending</span>
											<span class="tag is-success" v-else>complete</span>

										</div>
									</div>
								</div>
								<!-- /.right col -->
							</div>

							<!-- ./customer information -->

							<div class="columns row-top">
								<div class="column">
									<strong style="text-decoration:underline;">Invoice Products:</strong>
									<table class="table is-bordered is-fullwidth">
										<thead class="has-text-centered head">
											<tr>
												<th>#</th>
												<th>Item Description</th>
												<th>Quantity</th>
												<th>Unit Price</th>
												<th>Total Price</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(odr,index) in invo">
												<td>{{index+1}}</td>
												<td>{{odr.product.title}}</td>
												<td class="text-center">{{odr.quantity}} x ({{odr.product.net }} {{ odr.product.unit}})</td>
												<td class="text-center">৳{{odr.product.price}}</td>
												<td class="text-center">৳{{odr.quantity * odr.product.price}}</td>
											</tr>
											
											<tr >
												<td colspan="4" class="has-text-right">Total Amount</td>
												<td class="text-center">৳{{total}}</td>
											</tr>
											<tr class="strip">
												<td colspan="4" class="has-text-right">Delivery Charge</td>
												<td class="text-center">৳{{deliveryCharge}}</td>
											</tr>
											<tr >
												<td colspan="4" class="has-text-right">Total</td>
												<td class="text-center">৳{{finalTotal}}</td>
											</tr>
											<tr class="strip">
												<td colspan="4" class="has-text-right">Paid</td>
												<td class="text-center">৳{{paid}}</td>
											</tr>
											<tr >
												<td colspan="4" class="has-text-right">Balance</td>
												<td class="text-center">৳{{balance}}</td>
											</tr>
											<tr class="strip">
												<td colspan="5">
													<strong>In word:</strong> Taka {{$converter.toWords(balance) }} Only
												</td>
											</tr>
											
										</tbody>
									</table>
								</div>
							</div>
	

							<!-- ./product table -->
						</div>
					</div>
				</div>
			</div>
			<!-- ./second columns -->
		</div>
	</div>
</template>

<script>
	
import axios from 'axios'

export default {

  name: 'invoice',

  data () {
    return {
    	invo: [],
    	deliveryCharge: 50,
    	paid: 0,
    	address: []
    	
    }
  },
  mounted(){
  	this.initInvo(this.$route.params.oid)
  	//this.getAddress()
  },
  methods:{
  	setConfig(){
  		const AUTH_TOKEN = 'Bearer '.concat(this.$cookie.get(this.$store.getters.getUser.email))
		const ACCEPT = 'application/json'

		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
		axios.defaults.headers.common['Accept'] = ACCEPT
  	},
  	initInvo(cart){
  		var self = this
  		this.setConfig()

  		axios.get(this.$host+'order-details/'+cart)
  		.then(response => {
  			console.log(response)
  			self.invo = response.data
  			self.getAddress(self.$route.params.oid)
  		})
  	},
  	getAddress(aid){
  		var self = this

  		axios.get(this.$host+'address/' + aid)
  		.then(response=>{
  			self.address = response.data
  		})
  	}
  },
  components:{

  },
  watch:{

  },
  computed:{
  	total(){
  		let sum = 0
  		for(let i = 0; i < this.invo.length; i++){
  			sum += this.invo[i].product.price * this.invo[i].quantity
  		}
  		return sum
  	},
  	finalTotal(){
  		return (this.total + this.deliveryCharge)
  	},
  	balance(){
  		return this.finalTotal - this.paid
  	}
  }
}
</script>

<style lang="css" scoped>

	
	thead.head{
		background: #eee;
	}

	tr.strip{
		background: #eee;
	}


	.row-top{
		margin-top: 20px;
	}
	.row-bottom{
		margin-bottom: 10px;
	}

	.block{
		background: #fff;
		padding: 20px; 
		min-height: 100vh;
		border-radius: 2px;
		-webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .08);
		-moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .08);
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .08);


	}
	
	.block .block-header{
		height: 60px;
		 /* border-bottom: 1px solid #ddd;  */
		width: inherit;
		margin-bottom: 10px;

	}

	.hr-header{
		border-bottom: 1px solid #ddd;
	}

	.invoice{
		display: block;
		width: 100%;
		background: #eee;
		margin-top: 0px;
	}


	.title{
		letter-spacing: 2px;
	    font-size: 30px;
	    font-weight: 900;
	    text-decoration: underline;
	}

	.table{
		font-size: 13px !important;
	}

	@media print{
		.block-header{
			display: none;
		}
		.block-body{
			display: block;
			height: 60vh;
		}
	}
</style>