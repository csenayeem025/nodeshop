<template>
  <div class="wraper">


    <!--section start-->
    <section class="login-page pwd-page section-big-py-space bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div class="theme-card">
              <h3>Email Confirmation!</h3>
              <p>{{confirm_text}}</p>
              <br/>
              <router-link  class="btn btn-theme btn-normal btn-sm " :to="{path: '/login/'}">Login</router-link>
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
                loading: false,
                error: '',
                ismodal: true,
                showcode: false,
                confirm_text:'Successfully Confirmed. Now you can login.',
                mobile: ''
            }
        },
        methods:{

            sendToken(){
                //console.log('Route: ',this.$router.currentRoute.query.token);
                const formData = new FormData();
                formData.append("token", this.$router.currentRoute.query.token);
                formData.append("email", this.$router.currentRoute.query.email);
                axios.post(this.$host+'emailconfirm',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data==1) {
                            this.confirm_text = 'Successfully Confirmed. Now you can login.';
                        }else{
                            this.confirm_text='Sorry, your token is invalid or already confirmed.';
                        }
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });

            },
        },
        mounted(){
            this.sendToken();
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
