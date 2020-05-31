<template>
  <div class="profile m-t">
    <!-- section start -->
    <section class="section-big-py-space bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="account-sidebar"><a class="popup-btn">my account</a></div>
            <div class="dashboard-left">
              <div class="collection-mobile-back"><span class="filter-back"><i class="fa fa-angle-left" aria-hidden="true"></i> back</span></div>
              <left_nav></left_nav>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="dashboard-right">
              <div class="dashboard">
                <div class="page-title">
                  <h2>Change Password</h2></div>
                <div class="box-account box-info">
                  <form ref="registration_form" id="fromElements" @submit.prevent="changepassword" class="theme-form">
                    <div class="row">
                      <div class="col-sm-6">
                      <div class="msg-nwts-vue" v-if="error_text">
                        <div class="alert alert-danger" v-html="error_text"></div>
                      </div>
                      <div class="msg-nwts-vue" v-if="success">
                        <div class="alert alert-success" v-html="success"></div>
                      </div>
                      </div>
                      <div class="col-sm-6">
                      </div>
                      <div class="col-sm-6">
                        <div class="box">

                          <div class="box-content">
                            <div class="col-md-61 form-group">
                              <input type="password" class="form-control" id="rpassword" v-validate="'required'" v-model="password" name="password" placeholder="Enter your password" >
                              <p v-if="submitted && errors.has('password')" class="error-message">{{ errors.first('password') }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">

                      </div>
                      <div class="col-md-6">
                        <button class="btn btn-sm btn-normal mb-lg-5">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- section end -->
    <div class="loader-wrapper" v-if="loading==true">
      <div>
        <img src="/static/themes/assets/images/loader.gif" alt="loader">
      </div>
    </div>
  </div>
</template>

<script>
    import left_nav from '@/components/views/users/left-nav';
    import axios from 'axios';
    export default {
        name: 'changepassword',
        data () {
            return {
                loading:false,
                success:null,
                error_text:null,
                submitted:false,
            }
        },
        components:{
            left_nav:left_nav
        },
        methods:{
            changepassword(e) {
                e.preventDefault();
                this.error_text = '';
                this.success = '';
                this.loading = true;
                this.submitted = true;
                let self = this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        var form = document.getElementById('fromElements');
                        var formData = new FormData(form);
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'user_setnewpassword',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                            .then((response) => {
                                this.loading = false;
                                if(response.data==1){
                                    this.success='Successfully updated.';
                                }else{
                                    this.error_text='Sorry, not saved.';
                                }
                            })
                            .catch(function (error) {
                                this.loading = false;
                            });
                    }else{
                        this.loading = false;
                    }
                });
            },
            logout() {
                let email=this.$store.getters.getUser.email;

                this.$store.dispatch('setUser','')
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="css" scoped>

</style>
