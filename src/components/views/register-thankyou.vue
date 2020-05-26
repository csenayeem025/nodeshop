<template>
	<div class="wraper">


    <!--section start-->
    <section class="login-page pwd-page section-big-py-space bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div class="theme-card">
              <h3>{{thank_you_head}}</h3>
              <p>{{thank_you_content}}</p>
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
        thank_you_head:'Thank you for registering!',
        thank_you_content:'Successfully registerd. An activation link is sent to your mail.'
    }
  },
  methods:{

  	getThankYouType(){
  		var type = this.$router.currentRoute.query.t;
  		if(type=='forget') {
          this.thank_you_head = 'Thank you for Reset Request!';
          this.thank_you_content = 'Successfully a link is sent to your mail.';
      }else if(type=='reset'){
          this.thank_you_head='Thank you for Reset!';
          this.thank_you_content='Your password is successfully reset..';
      }else{

      }


  	},


  },
  computed:{

  },
    mounted(){
        this.getThankYouType();
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
