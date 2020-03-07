<template>
	<div class="popular">
		<div class="banner">
			<figure class="image">
				<img src="@/assets/images/banner_popular.jpg" alt="">
			</figure>
		</div>
		<!-- ./banner -->

    <div class="columns" style="margin-top: 20px;">
      <div class="column has-text-centered">
          <p class="title-text is-uppercase has-text-black">popular</p>
          <span class="title-modifier"></span>
      </div>
    </div>
		<!-- ./title bar -->


		<div class="columns is-mobile is-multiline">
			<div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd m-b-10" v-for="(product,index) in populars" :key="index">
				<product :product="product"></product>
			</div>
		</div>
    <infinite-loading @infinite="loadMore" ref="infiniteLoading" spinner="spiral">
      <div slot="no-more"></div>
    </infinite-loading>
		<!-- ./items -->

	</div>
</template>

<script>

import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import product from '@/components/elements/productkit'
import InfiniteLoading from 'vue-infinite-loading'



export default {

  name: 'popular',

  data () {
    return {
    	page: 1,
    	more: true,
    	bottom: false,
    	touchLine: false,
    	populars: []
    }
  },
  components:{
  	product,InfiniteLoading
  },
  created(){
  	this.setProducts([])
  },
  mounted(){

  },
  watch:{

  },
  methods:{

  	...mapActions([
  		'setProducts',
      'setMasterLoading'
  	]),
  	loadMore($state){

  		var self = this

  		axios.get(this.$host+'get-favorite',{
  			params:{
  				page: Math.floor(this.populars.length / this.$perPage)+1
  			}
  		})
  		.then(response => {
  			if(response.data.length){

  				self.populars = self.populars.concat(response.data)
  				self.setProducts(self.populars)
  				$state.loaded()

  				var api = response.data[0]

  				if(api.current_page >= api.last_page){
  					$state.complete()
  				}

  			}else{
  				$state.complete()
  			}
  		})
  	}
  },
  computed:{
  	...mapGetters({
  		
  	})
  }
}
</script>

<style lang="css" scoped>
</style>