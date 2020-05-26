<template>
  <div class="wraper">


    <!--section start-->
    <section class="login-page pwd-page section-big-py-space bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 offset-lg-3">
            <div class="theme-card">
              <h3>Set new Password</h3>
              <form id="fromForget" class="theme-form" @submit.prevent="setNewPassword">
                <div class="msg-nwts-vue" v-if="error_text">
                  <div class="alert alert-danger" v-html="error_text"></div>
                </div>
                <div class="msg-nwts-vue" v-if="success">
                  <div class="alert alert-success" v-html="success"></div>
                </div>
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="password" class="form-control" id="rpassword" v-validate="'required'" v-model="password" name="password" placeholder="Enter your password" >
                      <p v-if="submitted && errors.has('password')" class="error-message">{{ errors.first('password') }}</p>
                    </div>
                  </div>
                  <button class="btn btn-normal">Submit</button>
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
                loading: false,
                error: '',
                ismodal: true,
                submitted:false,
                success:null,
                error_text:null
            }
        },
        methods:{
            setNewPassword(e){
                e.preventDefault();
                this.error_text = '';
                this.success = '';
                this.loading = true;
                this.submitted = true;
                let self=this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        var form = document.getElementById('fromForget');
                        var formData = new FormData();
                        formData.append('password', self.password);
                        formData.append('token', this.$router.currentRoute.query.token);

                        axios.post(this.$host + 'setnewpassword', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                            this.loading = false;
                            if(response.data==1){
                                this.success='Your password is successfully reset.';
                                this.$router.push('/thank-you?t=reset');
                            }else{
                                this.error_text='Sorry, you are not authorized user.';
                            }

                        }).catch(function (error) {
                            this.loading = false;
                        });

                    }
                    //this.loading = false;
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
