<template>
	<div class="wraper">
		<div class="mobile" v-if="showlogin === 1">
			<form action="">
			

				<div class="field" v-if="!showcode">
					<span class="label">Mobile number</span>
					<div class="field has-addons">
					  <p class="control">
					    <a class="button is-large1 is-danger">
					      <strong>+88</strong>
					    </a>
					  </p>
					  <p class="control">
					      <input type="text" class="input is-block is-large" v-model="phoneNumber" placeholder="Mobile number">
					  </p>
					  
					</div>
				</div>
				<div class="field" v-else>
					<span class="label">Mobile number</span>
					<div class="field has-addons">
					  <p class="control">
					    <a class="button is-large is-primary is-flat">
					      <span class="icon">
					      	<i class="icofont icofont-key"></i>
					      </span>
					    </a>
					  </p>
					  <p class="control">
					      <input type="text" class="input is-block is-large" v-model="code" placeholder="6 digits verification code">
					  </p>
					  
					</div>
				</div>


				<br>
				
			</form>
		</div>
		<!-- ./mobile -->

		
		<div class="email" v-if="showlogin === 2">
			<form action="" @submit.prevent="login()">
				<!-- <button class="button is-link is-large is-block">
					<i class="icofont icofont-social-facebook"></i> Login with facebook
				</button> -->
				<button class="button is-warning is-large is-block m-t-5" @click.prevent="showlogin = 1">
					<i class="icofont icofont-ui-touch-phone"></i> Login with mobile
				</button>
				<div class="columns is-mobile is-gapless">
					<div class="column"><hr></div>
					<div class="column has-text-centered is-1">or</div>
					<div class="column"><hr></div>
				</div>

				<p class="field">
					<p class="control has-icons-left">
						<input type="text" class="input is-info is-medium" placeholder="Email address" v-model="email" autofocus>
						<span class="icon is-left">
							<i class="icofont icofont-envelope"></i>
						</span>
					</p>
				</p>
				<p class="field">
					<p class="control has-icons-left">
						<input type="password" class="input is-info is-medium" v-model="password" placeholder="Password">
						<span class="icon is-left">
							<i class="icofont icofont-key"></i>
						</span>
					</p>
				</p>
				<br>
				<button class="button is-danger is-block m-t-5 is-medium" type="submit" @click.prevent="login()">
					<simple-spinner v-if="loading" ></simple-spinner>
					<span v-else>Login</span>
					
				</button>

				<div class="footers has-text-centered m-t-10">
					<small class="">Don't have any account? </small>
					<button class="button is-small is-text has-text-danger is-uppercase" @click.prevent="showlogin = 3">sign up</button>
				</div>
			</form>
		</div>

		<!-- ./email -->

		
		<div class="email" v-if="showlogin === 3">
			<form action="" @submit.prevent="signup()">
				<!-- <button class="button is-link is-large is-block">
					<i class="icofont icofont-social-facebook"></i> Login with facebook
				</button> -->
				<button class="button is-black is-large is-block m-t-5" @click.prevent="showlogin = 1">
					<i class="icofont icofont-ui-touch-phone"></i> Login with mobile
				</button>
				<div class="columns is-mobile is-gapless">
					<div class="column"><hr></div>
					<div class="column has-text-centered is-1">or</div>
					<div class="column"><hr></div>
				</div>

				<p class="field">
					<p class="control has-icons-left">
						<input type="text" class="input is-info" placeholder="Full name" v-model="sname" autofocus>
						<span class="icon is-left">
							<i class="icofont icofont-user"></i>
						</span>
					</p>
				</p>
				<p class="field">
					<p class="control has-icons-left">
						<input type="text" class="input is-info" placeholder="Email address" v-model="semail">
						<span class="icon is-left">
							<i class="icofont icofont-envelope"></i>
						</span>
					</p>
				</p>
				<p class="field">
					<p class="control has-icons-left">
						<input type="password" class="input is-info" placeholder="Password" v-model="spassword">
						<span class="icon is-left">
							<i class="icofont icofont-key-hole"></i>
						</span>
					</p>
				</p>
				<p class="field">
					<p class="control has-icons-left">
						<input type="password" class="input is-info" placeholder="Confirm Password" v-model="cpassword">
						<span class="icon is-left">
							<i class="icofont icofont-key"></i>
						</span>
					</p>
				</p>
				<br>
				<button class="button is-danger is-medium is-block m-t-5 is-uppercase" type="submit">
					<simple-spinner v-if="sloading"></simple-spinner>
					<span v-else>sign up</span>
				</button>

				<div class="footers has-text-centered m-t-10">
					<small class="">Already have an account? </small>
					<button class="button is-small is-text has-text-danger is-uppercase"
					@click.prevent="showlogin = 2">sign in</button>
				</div>
			</form>
		</div>
		<!-- ./signup -->

	</div>
</template>

<script>

import axios from 'axios'

//import firebase from 'firebase'

import SimpleSpinner from 'vue-simple-spinner'

export default {

  name: 'login',

  data () {
    return {
    	showlogin: 1,
    	email: '',
    	password: '',
    	loading: false,
    	sloading: false,
    	cloading: false,
    	error: '',
    	sname:'',
    	semail:'',
    	spassword: '',
    	cpassword: '',
    	ismodal: true,
    	phoneNumber:'',
    	showcode: false,
    	code: '',
    	mobile: ''
    }
  },
  methods:{

  	sendCode(){
  		var self = this
  		

  	},
  	confirm(){
  		var self = this

  		this.cloading = true

  		confirmationResult.confirm(this.code)
  		.then(response => {
  			var user = response.user
  			
  			

  			if(user){
  				self.signup()
  			}
  			



  		})
  		.catch(err =>{
  			console.log(err)
  		})
  	},
  	close(){
  		this.$parent.$emit('update:show',false)
  	},
  	login(){
  		

		var self = this
    	this.loading = true

    	if(!this.$cookie.get(this.email)){
    		axios.post(this.$host+'login',{
    			email: this.email,
    			password: this.password
    		}).then(response=>{
    			console.log(response)
    			self.$cookie.set(self.email,response.data.token,30)
    			self.$store.dispatch('setUser',response.data.user)
    			
    			self.loading = false
    			self.sloading = false



    			if(response.data.user === "")
    				self.error = "Invalid credential"
    			else{
    				self.error = ''
    				self.showcode = false
	  				self.cloading = false

	  				self.phoneNumber = ''
	  				self.code = ''
    				self.close()	
    				
    			}

    		})
    	}else{
    		axios.post(this.$host+'login/1',{
    			email: this.email,
    			password: this.password
    		}).then(response=>{
    			console.log(response)
    			self.$store.dispatch('setUser',response.data.user)
    			self.loading = false
    			self.sloading = false
    			if(response.data.user === "")
    				self.error = "Invalid credential"
    			else{
    				self.error = ''
    				self.close()	
    			}
    			
    			
    		})
    	}
  	},
  	signup(){
  		var self = this
		this.sloading = true
		axios.post(this.$host+'register',{
			name: self.sname,
			email: self.semail,
			password: self.spassword,
			mobile: self.mobile
		})
		.then(response=>{
			if(response.data === 1){
				self.email = self.semail
				self.password = self.spassword
				self.login()

			}
		})
    	
  	}
  },
  computed:{

  },
  watch:{
  	phoneNumber(){
  		this.sname = this.phoneNumber
  		this.semail = this.phoneNumber
  		this.mobile = this.phoneNumber
  	},
  	code(){
  		this.spassword = this.code
  	}
  },
  components:{
  	SimpleSpinner
  }
}
</script>

<style lang="css" scoped>
	.button.is-block{
		width: 100%;
	}

	.m-t-5{
		margin-top: 5px;
	}
	.m-t-10{
		margin-top: 10px;
	}
</style>