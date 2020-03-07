<template>
	<div id="cart" class="mcart is-hidden-mobile">
		<modal :show.sync="modalshow" modifiers="is-small" > 
			<login></login>
		</modal>

		<div class="mcart-header">
			<nav class="level is-mobile is-multiline">
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
			<!-- <div class="delete is-medium" @click.prevent="togglecart"></div> -->
		</div>
		<div class="mcart-body">
			<div class="mcart-items" v-if="getCart.length > 0">
				<div class="columns is-mobile" v-for="(cart,index) in getCart" :key="index">
					<div class="column is-2 has-text-centered">
						<span class="icon" @click="upCount(cart.id)">
							<i class="icofont icofont-circled-up is-small"></i>
						</span><br>
						<small>{{cart.count}}</small>
						<br>
						<span class="icon" @click="downCount(cart.id)">
							<i class="icofont icofont-circled-down is-small"></i>
						</span>
					</div>
					<div class="column is-3">
						<figure class="image is-64x64">
							<img :src="$first(cart.image).link" alt="">
						</figure>
					</div>
					<div class="column">
						<small class="">{{cart.title}}</small>
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

			<div class="mcart-empty" v-else>
				<figure class="image is-2by1">
					<img src="@/assets/images/shopping-bag.svg" alt="">
				</figure>
				<br>
				<p class="is-size-4 has-text-centered has-text-light">
					No item on the bag! Start shopping.
				</p>
				
				
			</div>
			<!-- ./is-empty -->
			
		</div>

		<div class="mcart-footer" >

			<div class="place-order clearfix" v-show="getCart.length > 0">
				<div class="field has-addons has-addons-left">
				  <p class="control">
				    <button class="button is-danger is-medium" @click.prevent="checkout()">Place Order</button>
				  </p>
				  <p class="control">
				    <button class="button is-black is-medium " readonly><i class="icofont icofont-cur-taka"></i> {{total}}</button>
				  </p>
				</div>
			</div>
			<br>
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
	

	.place-order > .columns .column{
		
		color: #fff;
		width: 200px;
		

	}

	#cart{
		position: fixed;
		top: 52px;
		right: 0;
		bottom: 0;
		background: #fff;
		border-left: 1px solid #eee;
		width: 350px; 
		z-index: 2;
		/*font-family: 'Comfortaa', cursive;*/
		
	}
	
	.mcart-header{
		height: 40px;
		background: #222;
		color: #fff;
		padding: 7px;
	}
	.mcart-body{

	}

	.mcart-items{
		/*height: 300px;*/
		position: absolute;
		top: 45px;
		right: 0;
		bottom: 90px;
		overflow-y: auto;
		background: rgb(255,255,255);
		padding: 20px;
	}

	.mcart-empty{
    	background-color: rgba(0,0,0,0.4);
	}

	.mcart-empty .content{
		color: white;
	}
	
	.mcart-items .columns{
		border-bottom: 1px solid #fff;
	}
	

	.mcart-footer{
		/*height: 100px;*/
		background: #ddd;
		padding: 7px; 
		position: fixed;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #ccc;

		
	}

	.promo{
		width: 100%;
		color: #000;

	}

	.level small{
		font-size: 11px;
	}


</style>