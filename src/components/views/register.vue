<template>
  <div class="wraper">


    <!--section start-->
    <section class="login-page section-big-py-space bg-light">
      <div class="custom-container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <div class="theme-card">
              <h3 class="text-center">Create account</h3>
              <form ref="registration_form" id="fromElements" @submit.prevent="signup" class="theme-form">
                <div class="msg-nwts-vue" v-if="error_text">
                  <div class="alert alert-danger" v-html="error_text"></div>
                </div>
                <div class="msg-nwts-vue" v-if="success">
                  <div class="alert alert-success" v-html="success"></div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" class="form-control" v-validate="'required'" v-model="name"  placeholder="Full Name" name="name">
                    <p v-if="submitted && errors.has('name')" class="error-message">{{ errors.first('name') }}</p>
                  </div>
                  <div class="col-md-12 form-group">
                    <label for="mobile">Mobile</label>
                    <input type="text" id="mobile" class="form-control" v-validate="'required'" v-model="mobile" placeholder="Mobile" name="mobile">
                    <p v-if="submitted && errors.has('mobile')" class="error-message">{{ errors.first('mobile') }}</p>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <label for="remail">email</label>
                    <input type="text" class="form-control" id="remail" v-validate="'required'" v-model="email" placeholder="Email" name="email">
                    <p v-if="submitted && errors.has('email')" class="error-message">{{ errors.first('email') }}</p>
                  </div>
                  <div class="col-md-12 form-group">
                    <label for="rpassword">Password</label>
                    <input type="password" class="form-control" id="rpassword" v-validate="'required'" v-model="password" name="password" placeholder="Enter your password" >
                    <p v-if="submitted && errors.has('password')" class="error-message">{{ errors.first('password') }}</p>
                  </div>
                  <div class="col-md-12 form-group"><button class="btn btn-normal">create Account</button>
                    <!--                    <a href="javascript:void(0);" onclick="document.getElementById('fromElements').submit();" class="btn btn-normal">create Account</a>-->
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 ">
                    <input type="hidden" name="role" value="customer" />
                    <p>Do you want to create a <router-link  class="txt-default" :to="{path: '/register-vendor/'}">Vendor Account</router-link>?</p>
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
                sloading: false,
                cloading: false,
                error: '',
                sname:'',
                name:'',
                remail:'',
                rpassword:'',
                semail:'',
                spassword: '',
                cpassword: '',
                ismodal: true,
                phoneNumber:'',
                showcode: false,
                code: '',
                mobile: '',
                success:null,
                loading: false,
                error_text:null,
                submitted:false,
            }
        },
        methods:{


            signup:function(e) {
                e.preventDefault();
                this.error_text = '';
                this.success = '';
                this.loading = true;
                this.submitted = true;
                let self=this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        var form = document.getElementById('fromElements');
                        var formData = new FormData(form);
                        //formData.append('user_id', this.results.user_id);
                        //console.log(formData.$data);

                        axios.post(this.$host+'register',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                            .then((response) => {
                                this.loading = false;
                                if(response.data==1){
                                    this.success='Successfully updated.';
                                    this.$router.push('/thank-you');
                                }else{
                                    this.error_text='Sorry, not saved.';
                                }
                            })
                            .catch(function (error) {
                                this.loading = false;
                            });
                        return;

                    }else{
                        this.loading = false;
                    }
                });
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
