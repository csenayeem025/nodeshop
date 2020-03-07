<template>
	<div class="discount" style="margin-top: 20px;">
		<div class="banner" :style="{'background-image' : 'url(' + backgroundImage + ')'}">
			
			<div class="columns is-mobile ">
				<div class="column has-text-centered">
					<p class="title has-text-light">Start your first order with 3% discount!</p>
					<div class="discount-bar is-hidden-mobile">
						<ul class="indicator">
							<li class="first current" style="left:10%;">0</li>
							<li class="future second" style="left:50%;">1</li>
							<li class="future third" style="left:70%;">2</li>
							<li class="future fourth" style="left:90%;">3</li>
						</ul>
					</div>
					<br>
					<div class="discount-button">
						<button class="is-flat button is-danger is-medium">Click to apply 3% discount</button>
					</div>
				</div>
			</div>


			<div class="sun">
				<figure class="image is-128x128">
					<img src="@/assets/images/sun.gif" alt="">
				</figure>
			</div>
		</div>

		

		<div class="columns m-t-50">
			<div class="column is-8 is-offset-2">
				<div class="field has-addons">
				  <p class="control">
				    <div class="input is-large">
				    	<strong class="tag is-success is-rounded">Available</strong> &nbsp;
				    	<small class="is-size-6">3% discount</small>
				    </div>
				  </p>
				  <p class="control">
				    <a class="button is-danger is-large">
				      Apply to cart
				    </a>
				  </p>
				  
				</div>
			</div>
		</div>

		<!-- ./body -->

		<hr>
		
		<div class="columns">
			<div class="column is-8 is-offset-2 has-text-centered">
				<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, molestias, deleniti. Adipisci consectetur, voluptatem consequuntur distinctio laboriosam tenetur id, ut laudantium ipsa illo assumenda dolor optio ex architecto, facilis corporis.</small>
				<br><br>
				<strong>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis a neque, quos nihil, porro exercitationem. Unde exercitationem totam amet error.
				</strong>
			</div>
		</div>

		<!-- ./footnote -->


	</div>
</template>

<script>
export default {

  name: 'discount',

  data () {
    return {
    	backgroundImage: require('@/assets/images/cloud_sky.png')
    }
  }
}
</script>

<style lang="css" scoped>
	.banner{
		width: 100%;
		min-height: 300px;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		background-color: skyblue;

/*		-webkit-animation: skycolor 20s linear infinite;
		-moz-animation: skycolor 20s linear infinite;
		-ms-animation: skycolor 20s linear infinite;
		-o-animation: skycolor 20s linear infinite;
		animation: skycolor 20s linear infinite;*/

	}

	.sun{
		display: block;
		position: absolute;
		bottom: 0px;
		left: 0px;
		-webkit-animation: rotating 10s linear infinite;
		-moz-animation: rotating 10s linear infinite;
		-ms-animation: rotating 10s linear infinite;
		-o-animation: rotating 10s linear infinite;
		animation: rotating 10s linear infinite;
		
	}


	.discount-bar{
		width: 50%;
		height: 40px;
		background-color: rgba(255,255,255,0.4);
		border-radius: 30px;
		box-shadow: 0px 0px 5px 0px inset #222;
		display: inline-block;
		position: relative;
	}
	

	.discount-button{

		width: 40%;
		display: inline-block;
		margin-top: 100px;
	}

	.indicator{
		position: relative;
	}

	.indicator li {
		display: inline-block;
		
	}

	.indicator li{
		position: absolute;
		top: 55px;
		background-color: rgba(235, 0, 120,1);
		color: #fff;
		font-weight: 900;
		width: 25px;
		height: 25px;
		
	}

	li.current{
		background-color: #72BB00!important;
		color: #fff;

				-webkit-animation: bounce 2s linear infinite;
		-moz-animation: bounce 2s linear infinite;
		-ms-animation: bounce 2s linear infinite;
		-o-animation: bounce 2s linear infinite;
		animation: bounce 2s linear infinite;
	}

	li.current::before{
		border-color: #72BB00!important;
		border-top-color: transparent !important;
		border-left-color: transparent !important;
		border-right-color: transparent !important;
	}

	.indicator li::before{
		content: " ";
		position: absolute;
		border: 13px solid rgba(235, 0, 120,1);
		border-top-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		top: -31px;
    	left: -1px;
		bottom: 100%;
	}


	@-webkit-keyframes bounce{
		0%{
			transform: translateY(-10px);
		}
		25%{
			transform: translateY(5px);
		}
		50%{
			transform: translateY(10px);
		}
		75%{
			transform: translateY(5px);
		}
		100%{
			transform: translateY(-10px);
		}
	}

	@keyframes bounce{
		0%{
			transform: translateY(-10px);
		}
		25%{
			transform: translateY(5px);
		}
		50%{
			transform: translateY(10px);
		}
		75%{
			transform: translateY(5px);
		}
		100%{
			transform: translateY(-10px);
		}
	}


	@-webkit-keyframes skycolor{
		0%{
			background-color: skyblue; 
		}
		25%{
			background-color: #666;
		}
		50%{
			background-color: #000;
		}
		75%{
			background-color: #666;
		}
		100%{
			background-color: skyblue;
		}
	}

	@keyframes skycolor{
		0%{
			background-color: skyblue; 
		}
		25%{
			background-color: #666;
		}
		50%{
			background-color: #000;
		}
		75%{
			background-color: #666;
		}
		100%{
			background-color: skyblue;
		}
	}

	@-webkit-keyframes rotating {
	  from {
	    -webkit-transform: rotate(0deg);
	    -o-transform: rotate(0deg);
	    transform: rotate(0deg);
	  }
	  to {
	    -webkit-transform: rotate(360deg);
	    -o-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
	@keyframes rotating {
	  from {
	    -ms-transform: rotate(0deg);
	    -moz-transform: rotate(0deg);
	    -webkit-transform: rotate(0deg);
	    -o-transform: rotate(0deg);
	    transform: rotate(0deg);
	  }
	  to {
	    -ms-transform: rotate(360deg);
	    -moz-transform: rotate(360deg);
	    -webkit-transform: rotate(360deg);
	    -o-transform: rotate(360deg);
	    transform: rotate(360deg);
	  }
	}
</style>