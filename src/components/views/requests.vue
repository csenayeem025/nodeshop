<template>
	<div class="requests">
		<div class="card">
			<div class="card-image">
				<figure class="image is-4by3">
					<img src="@/assets/images/requests.jpg" alt="">
				</figure>
			</div>
			<div class="card-content">
				<p>Can not find a product you want in our inventory? Let us know what you are looking for and we will try our best to bring it in.</p>
				<form action="" @submit.prevent="sendRequest()">
					<div class="field">
						<p class="control">
							<label for="" class="label">Product Description</label>
							<textarea class="textarea" cols="10" rows="2"
							v-model="details"
							placeholder="Product Details"></textarea>
						</p>
					</div>
					<div class="field has-addons" v-if="!auth">

					  <p class="control">
						<label for="" class="label">Phone</label>
					    <a class="button">
					      <strong>+88</strong>
					    </a>
					  </p>
					  <p class="control is-fullwidth">
					  	<label for="" class="label">Number</label>
					      <input type="text" class="input is-fullwidth" placeholder="Mobile phone number" v-model="phone">
					  </p>
					  
					</div>

					<div class="field" v-else>
						<p class="control">
							<label for="" class="label">Quantity</label>
							<input type="text" class="input" placeholder="How many products you want" v-model="quantity">
						</p>
					</div>

					<button class="button is-primary" type="submit" @click.prevent="sendRequest()">Submit</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {

  name: 'requests',

  data () {
    return {
    	details:'',
    	quantity: '',
    	phone: ''
    }
  },
  mounted(){
  	this.generatePhone()
  },
  methods:{
  	generatePhone(){
  		if(this.auth){
	  		if(this.user.hasOwnProperty('mobile') && this.user.mobile !== null){
	  			this.phone = this.user.mobile
	  		}else{
	  			this.phone = ''
	  		}
	  	}else{
	  		this.phone = ''
	  	}
  	},
  	sendRequest(){

  		var self = this

  		axios.post(this.$host+'product-request',{
  			mobile: this.phone,
  			details: this.details,
  			quantity: this.quantity
  		})
  		.then(response => {
  			console.log(response)
  			self.quantity = ''
  			self.details = ''
  			self.close()

  		})
  	},
  	close(){
  		this.$parent.$emit('update:show',false)
  	}
  },
  computed:{
  	...mapGetters({
  		'user': 'getUser',
  		'auth': 'authCheck'
  	})
  },
  watch:{
  	user(){
  		this.generatePhone()
  	}
  }
}
</script>

<style lang="css" scoped>
</style>