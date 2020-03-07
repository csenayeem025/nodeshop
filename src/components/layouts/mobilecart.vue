<template>
	<div id="mbcart" class="mbcart is-hidden-tablet">
		<modal :show.sync="modalshow" modifiers="is-small" > 
			<login></login>
		</modal>

		<div class="mbcart-header">
			<nav class="level is-mobile">
				<div class="level-left">
					<div class="level-item ">
						<i class="icofont icofont-basket fa-2x"></i>&nbsp; 
						<strong v-if="getCart.length > 0" class="has-text-light">{{getCart.length}}</strong>
						<span v-else> No Item</span>
					</div>
				</div>
				<div class="level-right">
					<div class="level-item">
						<a class="delete is-small" @click.prevent="togglecart"></a>
					</div>
				</div>
			</nav>
		</div>
		<div class="mbcart-body">
			<div class="mbcart-items" v-if="getCart.length > 0">
				<div class="columns is-mobile is-gapless" v-for="(cart,index) in getCart" :key="index">
					<div class="column is-2 has-text-centered">
						<span class="icon" @click="upCount(cart.id)">
							<i class="fa fa-chevron-up text-2x"></i>
						</span><br>
						<small class="text-2x">{{cart.count}}</small>
						<br>
						<span class="icon" @click="downCount(cart.id)">
							<i class="fa fa-chevron-down text-2x"></i>
						</span>
					</div>
					<div class="column is-2">
						<figure class="image is-64x64">
							<img :src="cart.image" alt="">
						</figure>
					</div>
					<div class="column">
						<span class="">{{cart.title}} {{cart.adjective}}</span>
						<nav class="level is-mobile">
							<div class="level-left">
								<small class="level-item has-text-centered"><i class="icofont icofont-cur-taka"></i>{{cart.price}}/{{cart.net}}{{cart.unit}}</small>
								<small class="level-item has-text-centered"><i class="icofont icofont-cur-taka"></i>{{cart.price * cart.count}}</small>
							</div>
						</nav>
						
					</div>
					<div class="column is-1">
						<a href="" class="delete is-small" @click.prevent="removeItem(cart.id)"></a>
					</div>
				</div>
			</div>
			<!-- ./cart-items -->

			<div class="mbcart-empty" v-else>
				<figure class="image is-2by1">
					<img src="@/assets/images/shopping-bag.svg" alt="">
				</figure>
				<br>
				<p class="is-size-4 has-text-centered has-text-light">
					No item on the bag! Start shopping.
				</p>
				<br><br><br>

				<div class="hero is-danger">
					<div class="hero-body">
						For any query our hotline: <b>09384985</b>
					</div>
				</div>
				
			</div>
			<!-- ./is-empty -->
			
		</div>

		<div class="mbcart-footer" >
			<div class="promo">
				<span>
					<i class="fa fa-angle-up"></i>&nbsp; Have a special code?
				</span>
			</div>
		</div>
		
	</div>
	
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import modal from '@/components/elements/modal'
import login from '@/components/views/login'

export default {

  name: 'cart',

  data () {
    return {
    	isempty: false,
    	modalshow: false
    }
  },
  methods:{
  	...mapActions([
  		'togglecart',
  		'upCount',
  		'downCount',
  		'removeItem'
  		]),

  	checkout(){

  		if(!this.authCheck){
  			//open login modal
  			this.modalshow = true
  		}else{
  			//checkout

  			this.$router.push('/checkout')
  			this.togglecart()
  		}
  	}
  },
  computed:{
  	...mapGetters([
  		'getCart',
  		'authCheck'
  	]),
  	total(){
  		let sum = 0
  		for( let i = 0; i < this.getCart.length; i++){
  			sum += this.getCart[i].count * this.getCart[i].price
  		}
  		return sum
  	}
  },
  components:{
  	modal,login
  }

}
</script>

<style lang="css" scoped>
	
@import url("https://fonts.googleapis.com/css?family=Alegreya+Sans|Comfortaa|Dosis|Montserrat|Open+Sans+Condensed:300|Quicksand|Source+Code+Pro|Source+Sans+Pro|Source+Serif+Pro");
	

/*	.place-order > .columns .column{
		
		color: #fff;
		width: 200px;
		

	}*/

	#mbcart{
		position: fixed;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 50px;
		background: #fff;
		border-left: 1px solid #eee;
		z-index: 1;
		font-family: 'Comfortaa', cursive;
		
	}

	.mbcart-header{
		height: 40px;
		background: #222;
		color: #fff;
		padding: 5px;
	}

	.mbcart-items{
		position: absolute;
		top: 95px;
		bottom: 60px;
		left: 0;
		right: 0;
		overflow-y: auto;
	}


	.mbcart-footer{
		position: fixed;
		bottom: 55px;
		left: 5px;
		right: 0;
	}
	

	.text-2x{

		font-size: 24px;
	}
	/*.mbcart-header{
		height: 40px;
		 
		background: #222;
		color: #fff;
		padding: 7px;
	}
	.mbcart-body{

	}

	.mbcart-items{
		
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		background: rgb(255,255,255);
		padding: 20px;
	}

	.mbcart-empty{
    	background-color: rgba(0,0,0,0.4);
	}

	.mbcart-empty .content{
		color: white;
	}
	
	.mbcart-items .columns{
		border-bottom: 1px solid #fff;
	}
	

	.mbcart-footer{
		
		background: #ddd;
		padding: 7px; 
		position: fixed;
		bottom: 50px;
		width: 100%;
		border-top: 1px solid #ccc;

		
	}

	.promo{
		width: 100%;
		color: #000;

	}

	.level small{
		font-size: 11px;
	}*/

</style>