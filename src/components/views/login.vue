<template>
	<div class="wraper">


    <!--section start-->
    <section class="login-page section-big-py-space bg-light">
      <div class="custom-container">
        <div class="row">
          <div class="col-xl-4 col-lg-6 col-md-8 offset-xl-4 offset-lg-3 offset-md-2">
            <div class="theme-card">
              <h3 class="text-center">Login</h3>
              <form class="theme-form">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" id="email" placeholder="Email" required="">
                </div>
                <div class="form-group">
                  <label for="review">Password</label>
                  <input type="password" class="form-control" id="review" placeholder="Enter your password" required="">
                </div>
                <a href="javascript:void(0);" class="btn btn-normal">Login</a>
                <router-link  class="float-right txt-default mt-2" :to="{path: '/forget-pwd/'}">Forgot your password?</router-link>
<!--                <a class="float-right txt-default mt-2" href="forget-pwd.html" id="fgpwd">Forgot your password?</a>-->
              </form>
              <p class="mt-3">Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
<!--              <a href="register.html" class="txt-default pt-3 d-block">Create an Account</a>-->
              <router-link  class="txt-default pt-3 d-block" :to="{path: '/register/'}">
                Create an Account
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--Section ends-->


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
