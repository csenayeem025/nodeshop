<template>
  <div class="wraper">


    <!--section start-->
    <section class="login-page section-big-py-space bg-light">
      <div class="custom-container">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <div class="theme-card">
              <h3 class="text-center">Create account</h3>
              <form id="fromElements" @submit.prevent="signup" action="/site/profile-update" method="post" class="theme-form">
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
                    <p class="error-message">{{ errors.first('name') }}</p>
                  </div>
                  <div class="col-md-12 form-group">
                    <label for="mobile">Mobile</label>
                    <input type="text" id="mobile" class="form-control" v-validate="'required'" v-model="mobile" placeholder="Mobile" name="mobile">
                    <p class="error-message">{{ errors.first('mobile') }}</p>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <label for="remail">email</label>
                    <input type="text" class="form-control" id="remail" v-validate="'required'" v-model="remail" placeholder="Email" name="email">
                    <p class="error-message">{{ errors.first('remail') }}</p>
                  </div>
                  <div class="col-md-12 form-group">
                    <label for="rpassword">Password</label>
                    <input type="password" class="form-control" id="rpassword" v-validate="'required'" v-model="rpassword" name="password" placeholder="Enter your password" >
                    <p class="error-message">{{ errors.first('rpassword') }}</p>
                  </div>
                  <div class="col-md-12 form-group"><a href="javascript:void(0);" onclick="document.getElementById('fromElements').submit();" class="btn btn-normal">create Account</a></div>
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
            signup:function(e) {
                e.preventDefault();
                this.error_text = '';
                this.success = '';
                this.loading = true;
                this.$validator.validateAll().then((result) => {
                    alert(true);
                    if (result) {
                        var self = this
                        this.sloading = true
                        axios.post(this.$host + 'register', {
                            name: self.name,
                            email: self.remail,
                            password: self.rpassword,
                            mobile: self.mobile
                        })
                            .then(response => {
                                if (response.data === 1) {
                                    self.email = self.remail
                                    self.password = self.rpassword
                                    self.login()

                                }
                            })

                    }
                    this.loading = false;
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
