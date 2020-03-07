<template>
	<div id="pg-474-2" class="panel-grid panel-has-style clearfix">

  <div class="columns" style="margin-top: 20px;">
      <div class="column has-text-centered">
          <p class="title-text is-uppercase has-text-black">FEATURE PRODUCTS</p>
          <span class="title-modifier"></span>
      </div>
    </div>
                                        <div class="siteorigin-panels-stretch panel-row-style panel-row-style-for-474-2"
                                            data-stretch-type="full">
                                            <div id="pgc-474-2-0" class="panel-grid-cell">
                                                <div id="panel-474-2-0-0" class="so-panel widget widget_themegrill_flash_heading tg-widget section-title-wrapper panel-first-child"
                                                    data-index="4">
                                                   
                                                    <div class="section-description">Collaboratively administrate
                                                        empowered
                                                        markets via plug-and-play networks. Dynamically procras tinate
                                                        users.Collaboratively administrate empowered markets via
                                                        plug-and-play
                                                        networks. Dynamically procras tinate users.</div>
                                                </div>
                                                <div id="panel-474-2-0-1" class="woocommerce so-panel widget widget_themegrill_flash_portfolio tg-section feature-product-section panel-last-child"
                                                    data-index="5">
                                                   
            <div class="columns is-mobile is-multiline">
			<div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(product, index) in featured" :key="index">
				<product :product="product"></product>
			</div>
			<div class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd" v-for="(product, index) in featured" :key="index">
				<product :product="product"></product>
			</div>
		</div>
	
                                                    <!-- /.layout div -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'
import productkit from '@/components/elements/productkit'
import product from '@/components/elements/productkit'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'

import { mapGetters, mapActions } from 'vuex'



export default {

  name: 'blog',

  data () {
    return {
    	items: [],
      top: [],
			featured:[],
      showbutton: true,
      offers: []

    }
  },
  components:{
  	productkit,Carousel,Slide,InfiniteLoading,product
  },
  methods:{
    ...mapActions([
      'setCart',
      'upCount',
      'downCount',
      'setNotification',
      'setHead'
    ]),

  	getFood(){
  		var self = this
  		axios.get(this.$host+'items/Food')
  		.then(response=>{
  			console.log(response)
  			self.items = response.data
  		})
  	},
		getFeatured(){
  		var self = this
  		axios.get(this.$host+'home/featured')
  		.then(response=>{
        if(response.data.length){
            self.featured = response.data
        }else{
            self.featured = []
        }
  		})
  	},
  	 formatBrand(brand){
      return brand.split("-").join(" ")
    },
    formatLink(link){
      return link.split(" ").join("-")
    },
    topRated(){
      var self = this

      axios.get(this.$host+"top-rated")
      .then(response => {
        self.top = response.data
      })
    },
    offerPage(){
      var self = this

      axios.get(this.$host + 'offer-for-home-page')
      .then(response=>{
        self.offers = response.data
      })
    }
  },
  mounted(){
  	this.getFood()
		this.getFeatured()
    this.topRated()
    this.offerPage()
    this.setHead({
      title: "Home | grocery",
      description: "This is a grocery shop"
    })
  }
}
</script>

<style lang="css" scoped>
	.products{
		margin-top: 15px;
	}

  .inode{
    min-height: 250px;
  }

  .is-256x256{
    width: 256px;
    height: 256px;

  }


  .product{
    position: relative;
    height: 100%;
  }

  .product-body{
    position: absolute;
    background: rgba(0,0,0,0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    padding-top: 10px;
    color: #fff;
  
    vertical-align: baseline;
    cursor: pointer;
    display: none;
  }

  .product:hover .product-body{
    display: block;
  }
  
  .is-product{
    max-width: 200px;
    max-height: 200px;
    margin: 0 auto;
  }
  
  .is-product img{
    max-width: 100%;
    max-height: 200px; 
  }

  .product-image{
    position: relative;
  }

  .product-image .offer{
    position: absolute;
    top: 0;
    left: 0;
  }



</style>