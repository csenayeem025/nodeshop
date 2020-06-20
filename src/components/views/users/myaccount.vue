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
                  <h2>Manage Account</h2></div>
                <div class="box-account box-info">

                  <div class="row">
                    <div class="col-sm-6">
                      <div class="box">
                        <form class="theme-form" id="fromElements2" @submit.prevent="processAvatar" >
                          <div class="msg-nwts-vue" v-if="error_text_avatar">
                            <div class="alert alert-danger" v-html="error_text_avatar"></div>
                          </div>
                          <div class="msg-nwts-vue" v-if="success_avatar">
                            <div class="alert alert-success" v-html="success_avatar"></div>
                          </div>
                          <div class="form-group row">
                            <div class="col-md-12">
                              <div class="preview">

                                <img class="user_avatar" v-if="avatar!=null" :src="$host_domain+'/'+avatar" style="max-width: 200px" alt=""/>

                                <img v-else src="/static/assets/images/default-user-avatar.png" style="max-width: 200px" alt=""/>

                              </div>
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-md-12">
                              <label for="">User Avatar</label>
                              <input type="file" id="user-avatar" name="avatar">
                            </div>

                          </div>
                          <div class="form-group row">
                            <div class="col-md-12">
                              <button class="btn btn-sm btn-normal">Save</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="col-sm-6">
                    </div>
                    <div class="col-sm-6">
                      <div class="box">
                        <div class="box-title">
                          <h3>Account Information</h3><a href="#myaccountModal" data-toggle="modal">Edit</a></div>
                        <div class="box-content">
                          <h6 class="name">{{name}}</h6>
                          <h6 class="email">{{email}}</h6>
                        </div>
                      </div>

                      <div class="box">
                        <div class="box-title">
                          <h3>Organizational Information</h3><a href="#organizationModal" data-toggle="modal">Edit</a></div>
                        <div class="box-content">
                          <h6 class="name">{{company_name}}</h6>

                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="box">
                        <div class="box-title">
                          <h3>Educational Information</h3><a href="#educationModal" data-toggle="modal">Edit</a></div>
                        <div class="box-content">
                          <h6 class="name">{{education_name}}</h6>

                        </div>
                      </div>

                      <div class="box">
                        <div class="box-title">
                          <h3>Bank Information</h3><a href="#bankModal" data-toggle="modal">Edit</a></div>
                        <div class="box-content">
                          <h6 class="name">{{bank_name}}</h6>

                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--modal popup start-->
    <div class="modal fade bd-example-modal-lg theme-modal" id="myaccountModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="news-latter">
              <div class="modal-bg">
                <div class="offer-content">
                  <div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="page-title">
                      <h2>PERSONAL DETAIL</h2></div>


                    <!-- personal deatail section start -->
                    <div class="contact-page register-page section-big-py-space1 bg-light">
                      <div class="custom-container1">
                        <div class="row">
                          <div class="col-lg-12">
                            <form class="theme-form" id="fromElements" @submit.prevent="process" >
                              <div class="msg-nwts-vue" v-if="error_text">
                                <div class="alert alert-danger" v-html="error_text"></div>
                              </div>
                              <div class="msg-nwts-vue" v-if="success">
                                <div class="alert alert-success" v-html="success"></div>
                              </div>
                              <div class="form-row">
                                <div class="col-md-12">
                                  <div class="form-group">
                                    <label for="name">Full Name *</label>
                                    <input type="text" class="form-control" id="name" placeholder="Enter Your name" v-validate="'required'" v-model="name" name="name">
                                    <p v-if="submitted && errors.has('name')" class="error-message">{{ errors.first('name') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="review">Phone number *</label>
                                    <input type="text" class="form-control" id="review" placeholder="Enter your number"v-validate="'required'" v-model="mobile" name="mobile" >
                                    <p v-if="submitted && errors.has('mobile')" class="error-message">{{ errors.first('mobile') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <div class="form-group">
                                      <label for="email">Email</label>
                                      <input type="text" class="form-control" disabled="true" id="email" placeholder="Email" :value="email">
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 select_input">
                                  <div class="form-group">
                                    <label >Country *</label>
                                    <select class="form-control" id="allcountries" size="1" v-validate="'required'" v-model="country_id" name="country_id" >
                                      <option value="India">India</option>
                                      <option value="UAE">UAE</option>
                                      <option value="U.K">U.K</option>
                                      <option value="US">US</option>
                                    </select>
                                    <p v-if="submitted && errors.has('country_id')" class="error-message">{{ errors.first('country_id') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group mydate">
                                      <label for="birthofdate">Date of Birth *</label>
                                      <datepicker id="birthofdate" format="yyyy-MM-dd" v-validate="'required'" v-model="dateofbirth" name="dateofbirth" placeholder="Select Date"></datepicker>
                                    <p v-if="submitted && errors.has('dateofbirth')" class="error-message">{{ errors.first('dateofbirth') }}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="national_id">National ID *</label>
                                    <input type="text" class="form-control" id="national_id" placeholder="Enter national id"v-validate="'required'" v-model="national_id" name="national_id" >
                                    <p v-if="submitted && errors.has('national_id')" class="error-message">{{ errors.first('national_id') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-12">
                                  <button class="btn btn-sm btn-normal mb-lg-5">Save</button>
                                </div>
                              </div>
                            </form>
                          </div>

                        </div>
                      </div>
                    </div>
                    <!-- Section ends -->
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--modal popup end-->

    <!--modal popup start-->
    <div class="modal fade bd-example-modal-lg theme-modal" id="organizationModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="news-latter">
              <div class="modal-bg">
                <div class="offer-content">
                  <div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="page-title">
                      <h2>Organizational DETAIL</h2></div>


                    <!-- personal deatail section start -->
                    <div class="contact-page register-page section-big-py-space1 bg-light">
                      <div class="custom-container1">
                        <div class="row">
                          <div class="col-lg-12">
                            <user_company :company_name="company_name"></user_company>
                          </div>

                        </div>
                      </div>
                    </div>
                    <!-- Section ends -->
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--modal popup start-->
    <div class="modal fade bd-example-modal-lg theme-modal" id="educationModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="news-latter">
              <div class="modal-bg">
                <div class="offer-content">
                  <div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="page-title">
                      <h2>Education DETAIL</h2></div>


                    <!-- personal deatail section start -->
                    <div class="contact-page register-page section-big-py-space1 bg-light">
                      <div class="custom-container1">
                        <div class="row">
                          <div class="col-lg-12">
                            <user_education :education_name="education_name"></user_education>
                          </div>

                        </div>
                      </div>
                    </div>
                    <!-- Section ends -->
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--modal popup end-->


    <!--modal popup start-->
    <div class="modal fade bd-example-modal-lg theme-modal" id="bankModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="news-latter">
              <div class="modal-bg">
                <div class="offer-content">
                  <div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="page-title">
                      <h2>BANK DETAIL</h2></div>


                    <!-- personal deatail section start -->
                    <div class="contact-page register-page section-big-py-space1 bg-light">
                      <div class="custom-container1">
                        <div class="row">
                          <div class="col-lg-12">
                            <user_bank :bank_name="bank_name"></user_bank>
                          </div>

                        </div>
                      </div>
                    </div>
                    <!-- Section ends -->
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--modal popup end-->


    <!-- section end -->
    <div class="loader-wrapper" v-if="loading==true">
      <div>
        <img src="/static/themes/assets/images/loader.gif" alt="loader">
      </div>
    </div>
  </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import left_nav from '@/components/views/users/left-nav';
    import user_company from '@/components/views/users/user-company';
    import user_education from '@/components/views/users/user-education';
    import user_bank from '@/components/views/users/user-bank';
    import axios from 'axios';
    export default {

        name: 'myaccount',

        data () {
            return {
                loading:false,
                education_name:'Not yet set.',
                company_name:'Not yet set',
                bank_name:'Not yet set',
                name:'',
                mobile:'',
                national_id:'',
                country_id:'',
                dateofbirth:'',
                avatar:null,
                success:null,
                success_avatar:null,
                loading: false,
                error_text:null,
                error_text_avatar:null,
                submitted:false,
            }
        },
        components:{
            left_nav:left_nav,Datepicker,
            user_company:user_company,
            user_education:user_education,
            user_bank:user_bank
        },
        mounted(){
            this.name=this.$store.getters.getUser.name;
            this.email=this.$store.getters.getUser.email;
            this.mobile=this.$store.getters.getUser.mobile;
            this.getCountries();
        },
        methods:{
            process(e){
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
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'myaccount',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                            .then((response) => {
                                this.loading = false;
                                if(response.data==1){
                                    this.success='Successfully updated.';
                                    this.getInformation();
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
            },
            processAvatar(){
                this.error_text_avatar = '';
                this.success_avatar = '';
                this.loading = true;

                var form = document.getElementById('fromElements2');
                var formData = new FormData(form);
                formData.append('user_id', this.$store.getters.getUser.id);
                axios.post(this.$host+'setmyavatar',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data==1){
                            this.success_avatar='Successfully updated.';
                            this.getInformation();
                        }else{
                            this.error_text_avatar='Sorry, not saved.';
                        }
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            getCountries(){
                const formData = new FormData();
                axios.post(this.$host+'getCountries',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }})
                    .then((response) => {
                        this.loading = false;
                        //console.log('countries: ',response.data);
                        let text='<option value="">Select</option>';
                        if(response.data.length>0){
                            let len=response.data.length;
                            for(let i=0;i<len;i++){
                                text+='<option value="'+response.data[i].CountryId+'">'+response.data[i].name+'</option>';
                            }
                        }
                        //console.log(text);
                        document.getElementById("allcountries").innerHTML = text;
                        document.getElementById("allcountries").value=24;// 24 bangladesh


                        this.getInformation();
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            getInformation(){
                var formData = new FormData();
                formData.append('user_id', this.$store.getters.getUser.id);
                axios.post(this.$host+'get_user_information',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data.user.id){
                            this.name=response.data.user.name;
                            this.mobile=response.data.user.mobile;
                        }
                        if(response.data.information.user_id){
                            this.country_id=response.data.information.country_id;
                            this.dateofbirth=response.data.information.dateofbirth;
                            this.national_id=response.data.information.national_id;
                            this.avatar=response.data.information.avatar;
                        }
                    })
                    .catch(function (error) {
                        this.loading = false;
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
  #myaccountModal .form-group,
  #myaccountModal .form-control,
  #organizationModal .form-group,
  #organizationModal .form-control,
  #educationModal .form-group,
  #educationModal .form-control,
  #bankModal .form-group,
  #bankModal .form-control{
    text-align: left !important;
  }
  #myaccountModal .theme-form,
  #organizationModal .theme-form,
  #educationModal .theme-form,
  #bankModal .theme-form{
    border:0 !important;
  }
  #myaccountModal select,
  #organizationModal select,
  #educationModal select,
  #bankModal select{
    height: 50px;
  }
  .mydate input{
    width:100% !important;
  }

  .modal-file-upload,
  .theme-modal .modal-dialog .modal-content .modal-body .modal-bg .offer-content img{
    margin-bottom: 10px !important;
  }
</style>
