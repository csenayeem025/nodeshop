<template>
	<div id="checkout m-t-50" style="margin-top: 20px;">
		<div class="columns">
			<div class="column">

				<div class="card">
					<div class="card-header">
						<div class="card-header-title">Shipping information</div>
								
						<div class="card-header-icon">
							<button class="button is-danger is-outlined is-small" @click.prevent="showmodal = true">
								Add new address
							</button>
						</div>
					</div>
					<div class="card-content">
						<div class="columns is-mobile is-multiline">
							<div class="column is-half-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-fifth-fullhd" v-for="(info,index) in information" :key="index">
								<div class="address m-b-10" @click.stop="selectAddress(info.id)" :class="{'is-selected' : isSelected === info.id }"> 
									<span class="is-pulled-right" v-if="isSelected === info.id">
										<i class="icofont icofont-check-circled fa-2x has-text-success"></i>
									</span>
									<span class="is-pulled-right" style="cursor:pointer;" v-else>
										<i class="fa fa-pencil"></i>
									</span>

									<small>{{info.address}}</small><br>
									<small>{{info.mobile}}</small><br>
									<strong>{{info.area}}</strong>
								</div>
							</div>
						</div>
						<!-- ./addresses -->

					</div>
				</div>

				<!-- ./shipping informatin card -->

				<div class="card m-t-20">
					<div class="card-header">
						<div class="card-header-title">Delivery timings</div>
						<div class="card-header-icon">
							<span class="icon">
								<i class="icofont icofont-ui-clock"></i>
							</span>
						</div>
					</div>
					<div class="card-content">
						<div class="columns is-mobile">
							<div class="column">
								<div class="field">
									<label for="" class="label">Expected Delivery Date</label>
									<date-picker v-model="start" lang="en" editable format="yyyy-MM-dd"></date-picker>
									<p class="control has-icons-left">
										<!-- <input type="date" class="input is-large" v-model="start" placeholder="Start time">
										<span class="icon">
											<i class="icofont icofont-ui-clock is-left is-small"></i>
										</span> -->
										
									</p>
								</div>
							</div>
							
						</div>
					</div>
				</div>

				<!-- ./delivery timings -->

				<div class="box ">
					<form action="" @submit.prevent="checkout()">
						<div class="columns is-mobile ">
							<div class="column">
								<span class="icon">
									<i class="icofont icofont-cur-taka"></i>
								</span>
								<span>Cash on delivery</span>
							</div>
							<div class="column">
								<small>
									<span class="icon is-small">
								       <i class="icofont icofont-cur-taka"></i>
								    </span>
								    <span>10 delivery charge will be applied!</span>
								</small>
								<div class="field has-addons">
								  <p class="control">
								    <!-- <a class="button is-danger is-large" 
								    @click.prevent="section = false"
								    :disabled="isSelected === ''" 
								    v-if="section">
								      <span class="is-uppercase">proceed</span>
								    </a> -->
								    <a class="button is-danger is-large" type="submit"
								    :disabled="!start || !isSelected" 
								    @click.prevent="checkout()">
								    	<simple-spinner v-if="checkloading"></simple-spinner>
								      <span class="is-uppercase" v-else>checkout</span>
								    </a>
								  </p>

								  <p class="control">
								    <a class="button is-large is-dark">
								      <span class="icon is-small">
								        <i class="icofont icofont-cur-taka"></i>
								      </span>
								      <span>{{total}}</span>
								    </a>
								  </p>
								</div>
								<small>
									Please read our <span class="has-text-danger">terms &amp; conditions</span> first.
								</small>
							</div>
							<!-- ./columns -->
						</div>
						
					</form>
					
				</div>

				<!-- ./proceed buttons -->

			</div>
		</div>
		<modal :show.sync="showmodal" modifiers="is-default">
			<form action="" @submit.prevent="addInformation()">
				<div class="field">
					<label for="" class="label">Name</label>
					<p class="control has-icons-left">
						<input type="text" class="input" v-model="name" placeholder="Full name">
						<span class="icon">
							<i class="icofont icofont-user is-left is-small"></i>
						</span>
					</p>
				</div>
				<div class="field">
					<label for="" class="label">Mobile</label>
					<p class="control has-icons-left">
						<input type="text" class="input" v-model="mobile" placeholder="Mobile number">
						<span class="icon">
							<i class="icofont icofont-ui-touch-phone is-left is-small"></i>
						</span>
					</p>
				</div>
				<div class="field">
					<label for="" class="label">Address</label>
					<p class="control">
						<textarea name="" cols="10" rows="5" class="textarea" v-model="address"></textarea>
					</p>
				</div>
				<div class="field">
					<p class="control has-icons-left">
						<span class="select">
							<select v-model="area">
								<option :selected="area === '' " value="">Select an area</option>
								<option value="Sutrapur" :selected="area === 'Sutrapur' ">Sutrapur</option>
								<option value="Dhanmondi" :selected="area === 'Dhanmondi' ">Dhanmondi</option>
								<option value="Farmgate" :selected="area === 'Farmgate' ">Farmgate</option>
								<option value="Mirpur" :selected="area === 'Mirpur' ">Mirpur</option>
							</select>
						</span>
						<span class="icon is-small is-left">
					      <i class="icofont icofont-globe"></i>
					    </span>
						
					</p>
				</div>

				<button class="button is-primary is-medium" type="submit" @click.prevent="addInformation()">
					<simple-spinner v-if="loadingInfo"></simple-spinner>
					<span v-else>Add address</span>
				</button>
			</form>
		</modal>
	</div>
</template>

<script>

import axios from 'axios'

import modal from '@/components/elements/modal'
import SimpleSpinner from 'vue-simple-spinner'
import DatePicker from 'vue2-datepicker'

import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'checkout',
  

  data () {
    return {
    	showmodal: false,
    	name: '',
    	address: '',
    	mobile: '',
    	area: '',
    	openModal: false,
    	information: [],
    	loadingInfo : false,
    	isSelected: '',
    	timing: false,
    	isConfirmed: false,
    	start:'',
    	end: '',
    	selectedAddress: [],
    	section: false,
    	checkloading: false,
    	d:{}
    }
  },

  components:{
  	modal,SimpleSpinner,DatePicker
  },
  computed:{
  	...mapGetters({
  		user: 'getUser',
  		cart: 'getCart'
  	}),
  	userId(){
  		return this.user.id
  	},
  	total(){
  		let sum = 0
  		for( let i = 0; i < this.cart.length; i++){
  			sum += this.cart[i].count * this.cart[i].price
  		}
  		return sum
  	}

  },
  mounted(){
  	this.name = this.user.name,
  	this.getAddress()
  },
  methods:{

  	...mapActions([
  		'setNotification'
  	]),

	selectAddress(id){

  		if(this.isSelected === id){
  			this.isSelected = ''

  		}else{
  			this.isSelected = id

  			
  		}

  	},

  	close(){
  		this.showmodal = false
  	},
  	checkout(){
  		
  		this.checkloading = true
  		this.setConfig()

  		var self = this
  		
  		var data = {
  			id: this.userId,
  			address: this.isSelected,
  			cart: this.cart,
  			start: this.start,
  			end: this.end
  		}
  		// console.log('Data: ')
  		// console.log(data)

  		axios.post(this.$host+'place-order',data)
  		.then(response => {
  			console.log('order response')
  			console.log(response)
  			 self.checkloading = false
  			 self.$store.dispatch('evacuateCart')
  			 const notif = {
  			 	group: 'groce',
  			 	title: 'Checkout',
  			 	text: 'Order placed successfully! Thanks for being with us.',
  			 	type: 'vue-notification success'
  			 }
  			 self.setNotification(notif)
  			 self.$router.push('/')
  		})
  		.catch((err) =>{
  			console.log(err)
  		})
  	},

  	addInformation(){
  		this.loadingInfo = true
  		this.setConfig()

  		var self = this

  		var data = {
  			id: this.userId,
  			name: this.name,
  			address: this.address,
  			mobile: this.mobile,
  			area: this.area
  		}

  		axios.post(this.$host+'set-address',data)
  		.then(response=>{
  			self.getAddress()
  			self.close()
  			self.loadingInfo = false
  		})
  	},



  	setConfig(){
  		const AUTH_TOKEN = 'Bearer '.concat(this.$cookie.get(this.$store.getters.getUser.email))
		const ACCEPT = 'application/json'

		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
		axios.defaults.headers.common['Accept'] = ACCEPT
  	},
  	showModal(){
  		console.log("show modal")
  		this.$modal.show('hello-world')
  	},
  	hideModal(){
  		this.$modal.hide('hello-world')
  	},
  	getAddress(){
  		var self = this

  		this.setConfig()

  		axios.get(this.$host+'get-address')
  		.then(response=>{
  			console.log("address: "+response)
  			if(response.data.length <= 0){
  				self.information = []
  				//this.showModal()
  				self.$parent.$emit('update:show',true)
  			}
  			else{
  				self.information = response.data
  			}
  		})
  	},
  	proceed(){
  		this.isConfirmed = true
  	}
  }
}
</script>

<style lang="css" scoped>
	.address{
		background: #eee;
		min-height: 100px;
		border: 1px dashed #222; 
		padding: 10px;
		cursor: pointer;
	}

	.m-b-10{
		margin-bottom: 10px;
	}

	.is-selected{
		border: 1px solid red !important;
	}
</style>