<template>
	<div class="favorites">
    <br>

	    <div class="columns">
	      <div class="column ">
	        <small>Search Result for <code>"{{$route.params.item}}"</code></small>
	      </div>

	    </div>
	    <hr>
			<!-- end of breadcrumb -->
			<div class="clearfix"></div>
	    <div class="columns" v-if="products.length < 1">
	      <div class="column">
	          <div class="has-text-centered">
	            <span class="fa fa-ban has-text-danger"></span><br>
	            <h2>Nothing found for <code>"{{$route.params.item}}"</code></h2>

	          </div>
	      </div>
	    </div>

		<div class="columns is-mobile is-multiline">
			<div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(product, index) in products" :key="index">
				<product :product="product"></product>
			</div>
		</div>

		<!-- ./products -->

<!-- 	    <div class="columns columns-content">
	      <div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd">
	        <infinite-loading @infinite="loadMore"></infinite-loading>
	      </div>
	    </div> -->

	    <!-- ./load more -->

	</div>
</template>

<script>
	import axios from 'axios'

  import InfiniteLoading from 'vue-infinite-loading'
  import product from '@/components/elements/productkit'

  import _ from 'lodash'

  export default{
      data(){
        return {
          // declere your data here
          //offer: "../../assets/images/tag.png"
          icons:[
          'icofont icofont-animal-fish-alt-4',
          'icofont icofont-animal-rooster',
          'icofont icofont-animal-octopus',
          'icofont icofont-animal-penguin',
          'icofont icofont-fruits',
          'icofont icofont-water-bottle',
          'icofont icofont-animal-fish',
          ],
          search: '',
          more: true,
          products: []

        }
      },
      components: {
        InfiniteLoading,product
      },
      mounted(){


      },
      watch:{
        '$route' : 'initProducts'
      },
      computed: {
        // write computed methods here
        // products(){
        //   return this.$store.getters.getSearched
        // }
      },
      filters:{
        highlight(word,query){
          var check = new RegExp(query, "ig");
          return word.toString().replace(check, function(matchedText,a,b){
              return ('<strong><code>' + matchedText + '</code></strong>');
          });
        }
      },
      methods: {

        //Add product to cart
        addToCart(product){
          this.$store.dispatch('setCart',product)
        },
        //generate random index for icon
        randomIndex(){
          return Math.floor(Math.random() * this.icons.length)
        },


        /*
          * Load more button function
          * At first the whole search result
          * calculated at navbar.vue file
          * then comes here and if clicked in
          * load more then send another axios
          * request with parameter page = some page number
          * If all the records are loaded
          * then the load more button vanished.
          * Edit: Now there is using vue-infinite-loading plugins
          * which works with scrolling
        */
        initProducts(){
          let param = this.$route.params.item
          var self = this



            axios.get(this.$host+'search/'+param,{
              page: 1
            })
            .then(response => {
              if(response.data.data.length){
                self.products = response.data.data
              }else{
                self.products = []
              }
            })

        },

        loadMore($state){

          let param = this.$route.params.item
          var self = this


          axios.get('http://admin.onlinebigbazzar.com/api/search/'+param,{
            params:{
              page: Math.floor(this.products.length / 10)+1
            }
          })
          .then(response=>{


            if(response.data.data.length){
              self.products = self.products.concat(response.data.data)
              $state.loaded()

              if(response.data.current_page >= response.data.last_page){
                $state.complete()
              }
            }else{
              $state.complete()
            }


          })

        }
      }
  }
</script>

<style lang="css" scoped>
</style>
