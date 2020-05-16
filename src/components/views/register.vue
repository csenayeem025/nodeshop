<template>
	<div class="wraper">


    <!--section start-->
    <section class="login-page section-big-py-space bg-light">
      <div class="custom-container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <div class="theme-card">
              <h3 class="text-center">Create account</h3>
              <form class="theme-form">
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <label for="email">First Name</label>
                    <input type="text" class="form-control" id="fname" placeholder="First Name" required="">
                  </div>
                  <div class="col-md-12 form-group">
                    <label for="review">Last Name</label>
                    <input type="text" class="form-control" id="lname" placeholder="Last Name" required="">
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <label for="email">email</label>
                    <input type="text" class="form-control" id="email" placeholder="Email" required="">
                  </div>
                  <div class="col-md-12 form-group">
                    <label for="review">Password</label>
                    <input type="password" class="form-control" id="review" placeholder="Enter your password" required="">
                  </div>
                  <div class="col-md-12 form-group"><a href="#" class="btn btn-normal">create Account</a></div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 ">
                    <p >Have you already account? <router-link  class="txt-default" :to="{path: '/login/'}">click</router-link> here to <router-link  class="txt-default" :to="{path: '/login/'}">Login</router-link></p>
                  </div>
                </div>
              </form>
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
