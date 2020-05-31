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
                  <h2>Manage Addresses</h2></div>
                <div class="box-account box-info">


                  <div>
                    <div class="box">
                      <div class="box-title">
                        <h3>Address Book</h3><a href="#"></a></div>
                      <div class="row">
                        <div class="col-sm-6">
                          <h6>Default Billing Address</h6>
                          <address>
                            <div v-if="isBillingNo==0">You have not set a default billing address.</div>
                            <div v-else="isBillingNo==1">{{billing_flat_plot}}, {{billing_address}}, {{billing_city}}<br/>
                              {{billing_state}}, {{billing_zipcode}}, {{billing_country_name}}
                            </div>
                            <br><a href="#billingModal" data-toggle="modal">Edit Address</a></address>
                        </div>
                        <div class="col-sm-6">
                          <h6>Default Shipping Address</h6><address>
                          <div v-if="isShippingNo==0">You have not set a default shipping address.</div>
                          <div v-else="isShippingNo==1">{{shipping_flat_plot}}, {{shipping_address}}, {{shipping_city}}<br/>
                            {{shipping_state}}, {{shipping_zipcode}}, {{shipping_country_name}}</div>
                          <br><a href="#shippingModal" data-toggle="modal">Edit Address</a></address></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- section end -->
    <!--modal popup start-->
    <div class="modal fade bd-example-modal-lg theme-modal" id="billingModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="news-latter">
              <div class="modal-bg">
                <div class="offer-content">
                  <div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="page-title">
                      <h2>Manage Billing Addresses</h2></div>

                    <!-- personal deatail section start -->
                    <div class="contact-page register-page section-big-py-space1 bg-light">
                      <div class="custom-container1">
                        <div class="row">
                          <div class="col-lg-12">
                            <form class="theme-form" id="fromElements" @submit.prevent="process($event,'billing')" data-vv-scope="billing" >
                              <div class="msg-nwts-vue" v-if="error_text">
                                <div class="alert alert-danger" v-html="error_text"></div>
                              </div>
                              <div class="msg-nwts-vue" v-if="success">
                                <div class="alert alert-success" v-html="success"></div>
                              </div>
                              <div class="form-row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="billing_flat_plot">flat / plot *</label>
                                    <input type="text" class="form-control" id="billing_flat_plot" placeholder="company name" v-validate="'required'" v-model="billing_flat_plot" name="billing_flat_plot" data-vv-scope="billing">
                                    <p v-if="submitted && errors.has('billing.billing_flat_plot')" class="error-message">{{ errors.first('billing.billing_flat_plot') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="billing_address">Address *</label>
                                    <input type="text" class="form-control" id="billing_address" placeholder="Address" v-validate="'required'" v-model="billing_address" name="billing_address" data-vv-scope="billing">
                                    <p v-if="submitted && errors.has('billing.billing_address')" class="error-message">{{ errors.first('billing.billing_address') }}</p>
                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="billing_city">City *</label>
                                    <input type="text" class="form-control" id="billing_city" placeholder="City" v-validate="'required'" v-model="billing_city" name="billing_city" data-vv-scope="billing">
                                    <p v-if="submitted && errors.has('billing.billing_city')" class="error-message">{{ errors.first('billing.billing_city') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="billing_state">Region/State *</label>
                                    <input type="text" class="form-control" id="billing_state" placeholder="Region/state" v-validate="'required'" v-model="billing_state" name="billing_state" data-vv-scope="billing">
                                    <p v-if="submitted && errors.has('billing.billing_state')" class="error-message">{{ errors.first('billing.billing_state') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="billing_zipcode">Zip Code *</label>
                                    <input type="text" class="form-control" id="billing_zipcode" placeholder="zip-code"  v-validate="'required'" v-model="billing_zipcode" name="billing_zipcode" data-vv-scope="billing" >
                                    <p v-if="submitted && errors.has('billing.billing_zipcode')" class="error-message">{{ errors.first('billing.billing_zipcode') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6 select_input">
                                  <div class="form-group">
                                    <label for="billing_country_id" >Country *</label>
                                    <select class="form-control allcountries" id="billing_country_id" size="1" v-validate="'required'" v-model="billing_country_id" name="billing_country_id" data-vv-scope="billing">
                                      <option value="India">India</option>
                                      <option value="UAE">UAE</option>
                                      <option value="U.K">U.K</option>
                                      <option value="US">US</option>
                                    </select>
                                    <p v-if="submitted && errors.has('billing.billing_country_id')" class="error-message">{{ errors.first('billing.billing_country_id') }}</p>
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
    <div class="modal fade bd-example-modal-lg theme-modal" id="shippingModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="news-latter">
              <div class="modal-bg">
                <div class="offer-content">
                  <div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="page-title">
                      <h2>Manage Shipping Addresses</h2></div>

                    <!-- personal deatail section start -->
                    <div class="contact-page register-page section-big-py-space1 bg-light">
                      <div class="custom-container1">
                        <div class="row">
                          <div class="col-lg-12">
                            <form class="theme-form" id="fromElements2" @submit.prevent="process_shipping($event,'shipping')" data-vv-scope="shipping" >
                              <div class="msg-nwts-vue" v-if="error_text2">
                                <div class="alert alert-danger" v-html="error_text2"></div>
                              </div>
                              <div class="msg-nwts-vue" v-if="success2">
                                <div class="alert alert-success" v-html="success2"></div>
                              </div>
                              <div class="form-row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="shipping_flat_plot">flat / plot *</label>
                                    <input type="text" class="form-control" id="shipping_flat_plot" placeholder="company name" v-validate="'required'" v-model="shipping_flat_plot" name="shipping_flat_plot" data-vv-scope="shipping">
                                    <p v-if="submitted2 && errors.has('shipping.shipping_flat_plot')" class="error-message">{{ errors.first('shipping.shipping_flat_plot') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="shipping_address">Address *</label>
                                    <input type="text" class="form-control" id="shipping_address" placeholder="Address" v-validate="'required'" v-model="shipping_address" name="shipping_address" data-vv-scope="shipping">
                                    <p v-if="submitted2 && errors.has('shipping.shipping_address')" class="error-message">{{ errors.first('shipping.shipping_address') }}</p>
                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="shipping_city">City *</label>
                                    <input type="text" class="form-control" id="shipping_city" placeholder="City" v-validate="'required'" v-model="shipping_city" name="shipping_city" data-vv-scope="shipping">
                                    <p v-if="submitted2 && errors.has('shipping.shipping_city')" class="error-message">{{ errors.first('shipping.shipping_city') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="shipping_state">Region/State *</label>
                                    <input type="text" class="form-control" id="shipping_state" placeholder="Region/state" v-validate="'required'" v-model="shipping_state" name="shipping_state" data-vv-scope="shipping">
                                    <p v-if="submitted2 && errors.has('shipping.shipping_state')" class="error-message">{{ errors.first('shipping.shipping_state') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="shipping_zipcode">Zip Code *</label>
                                    <input type="text" class="form-control" id="shipping_zipcode" placeholder="zip-code"  v-validate="'required'" v-model="shipping_zipcode" name="shipping_zipcode" data-vv-scope="shipping">
                                    <p v-if="submitted2 && errors.has('shipping.shipping_zipcode')" class="error-message">{{ errors.first('shipping.shipping_zipcode') }}</p>
                                  </div>
                                </div>
                                <div class="col-md-6 select_input">
                                  <div class="form-group">
                                    <label for="shipping_country_id">Country *</label>
                                    <select class="form-control allcountries" id="shipping_country_id" size="1" v-validate="'required'" v-model="shipping_country_id" name="shipping_country_id" data-vv-scope="shipping">
                                      <option value="India">India</option>
                                      <option value="UAE">UAE</option>
                                      <option value="U.K">U.K</option>
                                      <option value="US">US</option>
                                    </select>
                                    <p v-if="submitted2 && errors.has('shipping.shipping_country_id')" class="error-message">{{ errors.first('shipping.shipping_country_id') }}</p>
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

        name: 'myaccount',

        data () {
            return {
                billing_flat_plot:'',
                billing_address:'',
                billing_city:'',
                billing_state:'',
                billing_zipcode:'',
                billing_country_id:'',
                billing_country_name:'',
                shipping_flat_plot:'',
                shipping_address:'',
                shipping_city:'',
                shipping_state:'',
                shipping_zipcode:'',
                shipping_country_id:'',
                shipping_country_name:'',

                isBillingNo:0,
                isShippingNo:0,

                loading: false,
                success:null,
                error_text:null,
                submitted:false,
                submitted2:false,
                success2:null,
                error_text2:null,

                countries:new Array(),
            }
        },
        components:{
            left_nav:left_nav
        },
        mounted(){
            this.getCountries();
        },
        methods:{
            process(e,scope){
                e.preventDefault();
                this.error_text = '';
                this.success = '';
                this.loading = true;
                this.submitted = true;
                let self=this;

                console.log(scope);

                this.$validator.validateAll(scope).then((result) => {
                    if (result) {
                        var form = document.getElementById('fromElements');
                        var formData = new FormData(form);
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'set_billing_addresses',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                            .then((response) => {
                                this.loading = false;
                                if(response.data==1){
                                    this.success='Successfully updated.';
                                    this.getAddresses();
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
            process_shipping(e,scope){
                e.preventDefault();
                this.error_text2 = '';
                this.success2 = '';
                this.loading = true;
                this.submitted2 = true;
                let self=this;
                this.$validator.validateAll(scope).then((result) => {
                    if (result) {
                        var form = document.getElementById('fromElements2');
                        var formData = new FormData(form);
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'set_shipping_addresses',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                            .then((response) => {
                                this.loading = false;
                                if(response.data==1){
                                    this.success2='Successfully updated.';
                                    this.getAddresses();
                                }else{
                                    this.error_text2='Sorry, not saved.';
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
                                this.countries[response.data[i].CountryId]=response.data[i].name;
                            }

                        }
                        //console.log(text);
                        //console.log(this.countries);
                        document.querySelectorAll(".allcountries")[0].innerHTML = text;
                        document.querySelectorAll(".allcountries")[0].value=24;// 24 bangladesh

                        document.querySelectorAll(".allcountries")[1].innerHTML = text;
                        document.querySelectorAll(".allcountries")[1].value=24;// 24 bangladesh

                        this.getAddresses();
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            getAddresses(){
                const formData = new FormData();
                formData.append('user_id', this.$store.getters.getUser.id);
                axios.post(this.$host+'getAddresses',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data.user_id){
                            this.billing_flat_plot=response.data.billing_flat_plot;
                            this.billing_address=response.data.billing_address;
                            this.billing_city=response.data.billing_city;
                            this.billing_state=response.data.billing_state;
                            this.billing_zipcode=response.data.billing_zipcode;
                            this.billing_country_id=response.data.billing_country_id;
                            if(this.countries.length>0){
                                this.billing_country_name=this.countries[this.billing_country_id];
                            }

                            this.shipping_flat_plot=response.data.shipping_flat_plot;
                            this.shipping_address=response.data.shipping_address;
                            this.shipping_city=response.data.shipping_city;
                            this.shipping_state=response.data.shipping_state;
                            this.shipping_zipcode=response.data.shipping_zipcode;
                            this.shipping_country_id=response.data.shipping_country_id;
                            if(this.countries.length>0){
                                this.shipping_country_name=this.countries[this.shipping_country_id];
                            }

                            if(this.billing_flat_plot != null && this.billing_address != null){
                                this.isBillingNo=1;
                            }else{
                                this.isBillingNo=0;
                            }

                            if(this.shipping_flat_plot != null && this.shipping_address != null){
                                this.isShippingNo=1;
                            }else{
                                this.isShippingNo=0;
                            }
                        }else{
                            this.billing_flat_plot='';
                            this.billing_address='';
                            this.billing_city='';
                            this.billing_state='';
                            this.billing_zipcode='';
                            this.billing_country_id=24;

                            this.shipping_flat_plot='';
                            this.shipping_address='';
                            this.shipping_city='';
                            this.shipping_state='';
                            this.shipping_zipcode='';
                            this.shipping_country_id='';

                            this.isBillingNo=0;
                            this.isShippingNo=0;
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
  #billingModal .form-group,
  #billingModal .form-control{
    text-align: left !important;
  }
  #billingModal .theme-form{
    border:0 !important;
  }
  #billingModal select{
    height: 45px;
  }

  #shippingModal .form-group,
  #shippingModal .form-control{
    text-align: left !important;
  }
  #shippingModal .theme-form{
    border:0 !important;
  }
  #shippingModal select{
    height: 45px;
  }
</style>
