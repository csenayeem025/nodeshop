<template>

<div>
<div class="columns" style="margin-top: 20px;">
      <div class="column has-text-centered">
          <p class="title-text is-uppercase has-text-black">Contact</p>
          <span class="title-modifier"></span>
      </div>
    </div>
 <div class="everest-forms"><div class="evf-container default" id="evf-472"><form id="evf-form-472" class="everest-form" data-formid="472" method="post" enctype="multipart/form-data" action="#" novalidate="novalidate"><div class="evf-field-container"><input type="hidden" id="_wpnonce" name="_wpnonce" value="b169eca7be"><input type="hidden" name="_wp_http_referer" value="/git_solvicor/shop2019/contact/"><div class="evf-frontend-row" data-row="row_1"><div class="evf-frontend-grid evf-grid-1" data-grid="grid_1"><div id="evf-472-field_lVizlNhYus-1-container" class="evf-field evf-field-text form-row validate-required" data-field-id="lVizlNhYus-1"><label class="evf-field-label" for="evf-472-field_lVizlNhYus-1">Name <abbr class="required" title="Required">*</abbr></label><input type="text" id="evf-472-field_lVizlNhYus-1" class="input-text" name="everest_forms[form_fields][lVizlNhYus-1]" required=""></div><div id="evf-472-field_XYnMdkQDKM-3-container" class="evf-field evf-field-email form-row validate-required validate-email" data-field-id="XYnMdkQDKM-3"><label class="evf-field-label" for="evf-472-field_XYnMdkQDKM-3">Email <abbr class="required" title="Required">*</abbr></label><input type="email" id="evf-472-field_XYnMdkQDKM-3" class="input-text" name="everest_forms[form_fields][XYnMdkQDKM-3]" required=""></div><div id="evf-472-field_xJivsqAS2c-2-container" class="evf-field evf-field-text form-row validate-required" data-field-id="xJivsqAS2c-2"><label class="evf-field-label" for="evf-472-field_xJivsqAS2c-2">Subject <abbr class="required" title="Required">*</abbr></label><input type="text" id="evf-472-field_xJivsqAS2c-2" class="input-text" name="everest_forms[form_fields][xJivsqAS2c-2]" required=""></div><div id="evf-472-field_YalaPcQ0DO-4-container" class="evf-field evf-field-textarea form-row" data-field-id="YalaPcQ0DO-4"><label class="evf-field-label" for="evf-472-field_YalaPcQ0DO-4">Message </label><textarea id="evf-472-field_YalaPcQ0DO-4" class="input-text" name="everest_forms[form_fields][YalaPcQ0DO-4]"></textarea></div></div></div></div><div class="evf-submit-container "><input type="hidden" name="everest_forms[id]" value="472"><input type="hidden" name="everest_forms[author]" value="1"><input type="hidden" name="everest_forms[post_id]" value="12"><button type="submit" name="everest_forms[submit]" class="everest-forms-submit-button button evf-submit " id="evf-submit-472" value="evf-submit">Submit</button></div></form></div></div>
</div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'
import productkit from '@/components/elements/productkit'
import axios from 'axios'

import { mapGetters, mapActions } from 'vuex'



export default {

  name: 'blog',

  data () {
    return {
    	items: [],
      top: [],
      showbutton: true,
      offers: []

    }
  },
  components:{
  	productkit,Carousel,Slide
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