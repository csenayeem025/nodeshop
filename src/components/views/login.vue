<template>
  <div class="wraper">


    <!--section start-->
    <section class="login-page section-big-py-space bg-light">
      <div class="custom-container">
        <div class="row">
          <div class="col-xl-4 col-lg-6 col-md-8 offset-xl-4 offset-lg-3 offset-md-2">
            <div class="theme-card">
              <h3 class="text-center">Login</h3>
              <form id="fromLogin" class="theme-form" @submit.prevent="login">
                <div class="msg-nwts-vue" v-if="error_text">
                  <div class="alert alert-danger" v-html="error_text"></div>
                </div>
                <div class="msg-nwts-vue" v-if="success">
                  <div class="alert alert-success" v-html="success"></div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" id="email" placeholder="Email" v-validate="'required'" v-model="email" name="email">
                  <p v-if="submitted && errors.has('email')" class="error-message">{{ errors.first('email') }}</p>
                </div>
                <div class="form-group">
                  <label for="review">Password</label>
                  <input type="password" class="form-control" id="review" placeholder="Enter your password" v-validate="'required'" v-model="password" name="password">
                  <p v-if="submitted && errors.has('password')" class="error-message">{{ errors.first('password') }}</p>
                </div>
<!--                <a href="javascript:void(0);" class="btn btn-normal">Login</a>-->
                <button class="btn btn-normal">Login</button>
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
    <div class="loader-wrapper" v-if="loading==true">
      <div>
        <img src="/static/themes/assets/images/loader.gif" alt="loader">
      </div>
    </div>

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
                error: '',
                ismodal: true,
                showcode: false,
                submitted:false,
                success:null,
                error_text:null
            }
        },
        methods:{
            getUserProfile(){
                let self=this;
                //console.log(this.$store.getters.getUser.email);
                //alert(this.$cookie.get(this.$store.getters.getUser.email));
                let email=this.$store.getters.getUser.email;
                //alert(email);
                if(email){
                    this.$router.push('/profile');
                }
            },
            login(e){
                e.preventDefault();
                this.error_text = '';
                this.success = '';
                this.loading = true;
                this.submitted = true;
                let self=this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        var form = document.getElementById('fromLogin');
                        var formData = new FormData();
                        formData.append('email',self.email);
                        formData.append('password',self.password);

                        if(!this.$cookie.get(self.email)){
                            axios.post(this.$host+'login',formData, { headers: { 'Content-Type': 'multipart/form-data'  }}).then(response=>{
                                console.log(response)
                                self.$cookie.set(self.email,response.data.token,30)
                                self.$store.dispatch('setUser',response.data.user)

                                self.loading = false
                                self.sloading = false



                                if(response.data.user === ""){
                                    self.error_text = "Invalid credential";
                                    self.success='';
                                } else{
                                    self.error = ''
                                    self.showcode = false
                                    self.cloading = false
                                    self.success='Successfully Loggedin.';
                                    this.$router.push('/profile');
                                }

                            })
                        }else{
                            axios.post(this.$host+'login/1',formData, { headers: { 'Content-Type': 'multipart/form-data'  }}).then(response=>{
                                console.log(response)
                                self.$store.dispatch('setUser',response.data.user)
                                self.loading = false
                                self.sloading = false

                                if(response.data.user === ""){
                                    self.error_text = "Invalid credential";
                                    self.success='';
                                }else{
                                    self.error = ''
                                    self.success='Successfully Loggedin.';
                                    this.$router.push('/profile');
                                }


                            })
                        }
                    }
                    //this.loading = false;
                });



            },

        },
        computed:{

        },
        mounted(){
            this.getUserProfile();
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
