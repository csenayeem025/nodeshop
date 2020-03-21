<template>
	<div>

    <!--header start-->
    <header>
      <div class="mobile-fix-option"></div>
      <div class="top-header">
        <div class="custom-container">
          <div class="row">
            <div class="col-xl-5 col-md-7 col-sm-6">
              <div class="top-header-left">
                <div class="shpping-order">
                  <h6>free shipping on order over  <i class="icofont icofont-cur-taka"></i>99 </h6>
                </div>
                <div class="app-link">
                  <h6>
                    Download aap
                  </h6>
                  <ul>
                    <li><a><i class="fa fa-apple" ></i></a></li>
                    <li><a><i class="fa fa-android" ></i></a></li>
                    <li><a><i class="fa fa-windows" ></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-7 col-md-5 col-sm-6">
              <div class="top-header-right">
                <div class="top-menu-block">
                  <ul>
                    <li><a href="#">gift cards</a></li>
                    <li><a href="#">Notifications</a></li>
                    <li><a href="#">help & contact</a></li>
                    <li><a href="#">todays deal</a></li>
                    <li><a href="#">track order</a></li>
                    <li><a href="#">shipping </a></li>
                    <li><a href="#">easy returns</a></li>
                  </ul>
                </div>
                <div class="language-block">
                  <div class="language-dropdown">
                                <span  class="language-dropdown-click">
                                    english <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                    <ul class="language-dropdown-open">
                      <li><a href="#">hindi</a></li>
                      <li><a href="#">english</a></li>
                      <li><a href="#">marathi</a></li>
                      <li><a href="#">spanish</a></li>
                    </ul>
                  </div>
                  <div class="curroncy-dropdown">
                                <span class="curroncy-dropdown-click">
                                    usd<i class="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                    <ul class="curroncy-dropdown-open">
                      <li><a href="#"><i class="fa fa-inr"></i>inr</a></li>
                      <li><a href="#"><i class="fa fa-usd"></i>usd</a></li>
                      <li><a href="#"><i class="fa fa-eur"></i>eur</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout-header4">
        <div class="container">
          <div class="row">
            <div class="col-4">
              <div class="contact-block">
                <div class="sm-nav-block">
                  <span class="sm-nav-btn"><i class="fa fa-bars"></i></span>
                  <ul class="nav-slide">
                    <li>
                      <div class="nav-sm-back">
                        back <i class="fa fa-angle-right pl-2"></i>
                      </div>
                    </li>
                    <li v-for="(child,index) in items.children" :key="index">
                      <router-link tag="div" :to="{path: '/navigate/'+formatLink(child.child)}">
                        <img src="static/assets/uploads/icons/6.png"
                             width="25" height="19">{{child.child}}
                      </router-link>
                    </li>

                  </ul>

                </div>
                <div class="desc-nav-block">
                  <i class="fa fa-volume-control-phone tell" aria-hidden="true"></i>
                  <span class="contact-item">
                            call us
                            <span>+88 01738 912894</span>
                        </span>
                  <div class="onhover-dropdown ">
                    <i class="icon-user mobile-user " onclick="openAccount()">
                    </i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="logo-block">
                <a href="/">
                  <img src="static/assets/uploads/sites/flash-logo.png" width="150px" alt="logo" class="img-fluid  ">
                </a>
              </div>
            </div>
            <div class="col-4">
              <div class="icon-block">
                <ul>
                  <li onclick="openAccount()" class="mobile-user onhover-dropdown"><a href="#"><i class="icon-user"></i></a>

                  </li>
                  <li class="mobile-search"><a href="#"><i class="icon-search"></i></a>
                    <div class ="search-overlay">
                      <div>
                        <span class="close-mobile-search">×</span>
                        <div class="overlay-content">
                          <div class="container">
                            <div class="row">
                              <div class="col-xl-12">
                                <form>
                                  <div class="form-group"><input type="text" class="form-control" id="exampleInputPassword1" placeholder="Search a Product"></div>
                                  <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="mobile-wishlist" onclick="openWishlist()"><a href="#"><i class="icon-heart"></i></a></li>
                  <li class="mobile-setting mobile-setting-hover" onclick="openSetting()"><a href="#"><i class="icon-settings"></i></a>
                  </li>
                  <li class="mobile-cart cart-hover-div" onclick="openCart()">
                    <a href="#">
                      <i class="icon-shopping-cart "></i>
                      <div class="cart-item"><div> <i class="icofont icofont-cur-taka"></i>00.0<span>cart</span></div></div>
                    </a>
                  </li>
                </ul>
                <span class="toggle-nav">
                            <i class="fa fa-bars"></i>
                        </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="category-header-4">
        <div class="custom-container">
          <div class="row">
            <div class="col">
              <div class="navbar-menu">
                <div class="category-left">
                  <div class=" nav-block">
                    <div class="nav-left" >
                      <nav class="navbar" data-toggle="collapse" data-target="#navbarToggleExternalContent">
                        <button class="navbar-toggler" type="button">
                          <span class="navbar-icon"><i class="fa fa-arrow-down"></i></span>
                        </button>
                        <h5 class="mb-0  text-white title-font">Shop by category</h5>
                      </nav>
                      <div class="collapse show nav-desk" id="navbarToggleExternalContent">
                        <ul class="nav-cat title-font">
                          <li v-for="(child,index) in items.children" :key="index">
                            <router-link tag="div" :to="{path: '/navigate/'+formatLink(child.child)}">
                              <img src="static/assets/uploads/icons/6.png"
                                   width="25" height="19">{{child.child}}
                            </router-link>
                          </li>

                        </ul>

                      </div>
                    </div>
                  </div>
                  <div class="menu-block">
                    <nav id="main-nav">
                      <div class="toggle-nav"><i class="fa fa-bars sidebar-bar"></i></div>
                      <ul id="main-menu" class="sm pixelstrap sm-horizontal">
                        <li>
                          <div class="mobile-back text-right">Back<i class="fa fa-angle-right pl-2" aria-hidden="true"></i></div>
                        </li>
                        <!--HOME-->
                        <li>
                          <a href="/" class="light-menu-item">Home</a>

                        </li>
                        <!--HOME-END-->

                        <!--SHOP-->
                        <li>
                          <a href="#" class="light-menu-item">shop</a>
                        </li>
                        <!--SHOP-END-->
                        <!--product-meu start-->
                        <li class="mega"><a href="#" class="light-menu-item">product
                        </a>
                          <ul class="mega-menu full-mega-menu ">
                            <li>
                              <div class="container">
                                <div class="row">
                                  <div class="col mega-box">
                                    <div class="link-section">
                                      <div class="menu-title">
                                        <h5>sidebar</h5>
                                      </div>
                                      <div class="menu-content">
                                        <ul>
                                          <li><a href="product-page(left-sidebar).html">left sidebar</a></li>
                                          <li><a href="product-page(right-sidebar).html">right sidebar</a></li>
                                          <li><a href="product-page(no-sidebar).html">non sidebar</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col mega-box">
                                    <div class="link-section">
                                      <div class="menu-title">
                                        <h5>bonus layout</h5>
                                      </div>
                                      <div class="menu-content">
                                        <ul>
                                          <li><a href="product-page(bundle).html">bundle</a></li>
                                          <li><a href="product-page(image-swatch).html">image swatch</a></li>
                                          <li><a href="product-page(vertical-tab).html">vertical tab</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col mega-box">
                                    <div class="link-section">
                                      <div class="menu-title">
                                        <h5>product layout <span class="new-tag">new</span></h5>
                                      </div>
                                      <div class="menu-content">
                                        <ul>
                                          <li><a href="product-page(4-image).html">4 image </a></li>
                                          <li><a href="product-page(sticky).html">sticky</a></li>
                                          <li><a href="product-page(accordian).html">accordian</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col mega-box">
                                    <div class="link-section">
                                      <div class="menu-title">
                                        <h5>thumbnail image</h5>
                                      </div>
                                      <div class="menu-content">
                                        <ul>
                                          <li><a href="product-page(left-image).html">left image</a></li>
                                          <li><a href="product-page(right-image).html">right image</a></li>
                                          <li><a href="product-page(image-outside).html">image outside</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col mega-box">
                                    <div class="link-section">
                                      <div class="menu-title">
                                        <h5>3 column</h5>
                                      </div>
                                      <div class="menu-content">
                                        <ul>
                                          <li><a href="product-page(3-col-left).html">thumbnail left</a></li>
                                          <li><a href="product-page(3-col-right).html">thumbnail right</a></li>
                                          <li><a href="product-page(3-column).html">thubnail bottom</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col mega-box">
                                    <div class="link-section">
                                      <div class="menu-title">
                                        <h5>product element</h5>
                                      </div>
                                      <div class="menu-content">
                                        <ul>
                                          <li><a href="element-productbox.html">product box</a></li>
                                          <li><a href="element-product-slider.html">product slider</a></li>
                                          <li><a href="element-no_slider.html">no slider</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="row menu-banner">
                                  <div class="col-lg-6">
                                    <div>
                                      <img src="static/themes/assets/images/menu-banner1.jpg" alt="menu-banner" class="img-fluid">
                                    </div>
                                  </div>
                                  <div class="col-lg-6">
                                    <div>
                                      <img src="static/themes/assets/images/menu-banner2.jpg" alt="menu-banner" class="img-fluid">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <!--product-meu end-->

                        <!--mega-meu start-->
                        <li class="mega" id="hover-cls">
                          <a href="#" class="light-menu-item">features</a>

                        </li>
                        <!--mega-meu end-->
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="category-right">
                  <div class="input-block">
                    <form class="big-deal-form">
                      <div class="input-group ">
                        <div class="input-group-prepend">
                          <span class="search"><i class="fa fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search a Product" >
                        <div class="input-group-prepend">
                          <select>
                            <option>All Category</option>
                            <option>indurstrial</option>
                            <option>sports</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="btn-group">
                    <div  class="gift-block" data-toggle="dropdown" >
                      <div class="grif-icon">
                        <i class="icon-gift"></i>
                      </div>
                      <div class="gift-offer">
                        <p>gift box</p>
                        <span>Festivel Offer</span>
                      </div>
                    </div>
                    <div class="dropdown-menu gift-dropdown">
                      <div class="media">
                        <div  class="mr-3">
                          <img src="static/themes/assets/images/icon/1.png" alt="Generic placeholder image">
                        </div>
                        <div class="media-body">
                          <h5 class="mt-0">Billion Days</h5>
                          <p><img src="static/themes/assets/images/icon/currency.png" class="cash" alt="gift"> Flat Rs. 270 Rewards</p>
                        </div>
                      </div>
                      <div class="media">
                        <div  class="mr-3">
                          <img src="static/themes/assets/images/icon/2.png" alt="Generic placeholder image">
                        </div>
                        <div class="media-body">
                          <h5 class="mt-0">Fashion Discount</h5>
                          <p><img src="static/themes/assets/images/icon/fire.png"  class="fire" alt="gift">Extra 10% off (upto Rs. 10,000*) </p>
                        </div>
                      </div>
                      <div class="media">
                        <div  class="mr-3">
                          <img src="static/themes/assets/images/icon/3.png" alt="Generic placeholder image">
                        </div>
                        <div class="media-body">
                          <h5 class="mt-0">75% off Store</h5>
                          <p>No coupon code is required.</p>
                        </div>
                      </div>
                      <div class="media">
                        <div  class="mr-3">
                          <img src="static/themes/assets/images/icon/6.png" alt="Generic placeholder image">
                        </div>
                        <div class="media-body">
                          <h5 class="mt-0">Upto 50% off</h5>
                          <p>Buy popular phones under Rs.20.</p>
                        </div>
                      </div>
                      <div class="media">
                        <div  class="mr-3">
                          <img src="static/themes/assets/images/icon/5.png" alt="Generic placeholder image">
                        </div>
                        <div class="media-body">
                          <h5 class="mt-0">Beauty store</h5>
                          <p><img src="static/themes/assets/images/icon/currency.png" class="cash" alt="gift"> Flat Rs. 270 Rewards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sm-nav-block">
                    <span class="sm-nav-btn"><i class="fa fa-bars"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>


	</div>
</template>

<script>


import axios from 'axios'

export default {

  name: 'navbar',

  data () {
    return {
        items: [],
    	showburger: false,
    	modalshow: false,
    	item:''

    }
  },
  computed: {

  },
  methods: {

           getFood(){
  		var self = this
  		axios.get(this.$host+'items/Food')
  		.then(response=>{
  			console.log(response)
  			self.items = response.data
  		})
  	},
      formatLink(link){
      return link.split(" ").join("-")
    },


  },
  components:{

  },



  mounted(){
    this.getFood()

  }
}
</script>

<style lang="css" scoped>

</style>
