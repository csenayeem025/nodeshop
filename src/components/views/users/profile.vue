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
<!--              <profile_left_nav></profile_left_nav>-->
              <div class="profile m-t profile_left_nav">
                <div class="block-content">
                  <div class="form-group row">
                    <div class="col-md-12">
                      <div class="preview">

                        <img class="user_avatar rounded-circle" v-if="avatar!=null" :src="$host_domain+'/'+avatar" style="max-width: 200px" alt=""/>
                        <img v-else src="/static/assets/images/default-user-avatar.png" style="max-width: 200px" alt=""/>

                      </div>
                    </div>
                    <div class="col-md-12">
                      <h5>Profile Information</h5>
                      <p v-if="name!=''"><b>{{name}}</b></p>
                      <p v-if="acc_code!=''">A/C Code: <b>{{acc_code}}</b></p>
                      <p v-if="mobile!=''">{{mobile}}</p>
                      <p v-if="email!=''"><a :href="'mail:'+email">{{email}}</a></p>
                      <p v-if="user_country_name!=''">{{user_country_name}}</p>
                      <p v-if="dateofbirth!=''">Birthday: {{ dateofbirth | moment("MMMM Do ") }}</p>
                      <p v-if="created_at!=''">Open Date: {{ created_at | moment("MMMM Do, YYYY") }}</p>
                    </div>
                    <div class="col-md-12">
                      <h5>Organizational Information</h5>
                      <p v-if="company_name!=''"><b>{{company_name}}</b></p>
                      <p v-if="company_email!=''">{{company_email}}</p>
                      <p v-if="company_mobile!=''">{{company_mobile}}</p>
                      <p v-if="company_type_name!=''">{{company_type_name}}</p>
                      <p v-if="company_address!=''">{{company_address}}</p>
                    </div>
                    <div class="col-md-12">
                      <h5>Certification Information</h5>
                      <p v-if="education_name!=''"><b>{{education_name}}</b></p>
                      <p v-if="education_type!=''">{{education_type}}</p>
                    </div>
                    <div class="col-md-12">
                      <h5>Bank Information</h5>
                      <p v-if="bank_name!=''"><b>{{bank_name}}</b></p>
                      <p v-if="account_type!=''"> {{account_type}}</p>
                      <p v-if="account_number!=''">{{account_number}}</p>
                      <p v-if="branch_name!=''">{{branch_name}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!--              <profile_left_nav></profile_left_nav>-->

            </div>
          </div>
          <div class="col-lg-9">
            <div class="dashboard-right">
              <div class="dashboard">


                <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged">
                  <tab name="Home">
                    This is the profile of <b>{{name}}</b>!<br/><br/>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                  </tab>
                  <tab name="Address">
                    <div class="row">
                      <div class="col-sm-6">
                        <h6>Default Billing Address</h6>
                        <address>
                          <div v-if="isBillingNo==0">You have not set a default billing address.</div>
                          <div v-else="isBillingNo==1">{{billing_flat_plot}}, {{billing_address}}, {{billing_city}}<br/>
                            {{billing_state}}, {{billing_zipcode}}, {{billing_country_name}}
                          </div>
                          </address>
                      </div>
                      <div class="col-sm-6">
                        <h6>Default Shipping Address</h6><address>
                        <div v-if="isShippingNo==0">You have not set a default shipping address.</div>
                        <div v-else="isShippingNo==1">{{shipping_flat_plot}}, {{shipping_address}}, {{shipping_city}}<br/>
                          {{shipping_state}}, {{shipping_zipcode}}, {{shipping_country_name}}</div>
                        </address></div>
                    </div>
                  </tab>
                  <tab name="Customer" :is-disabled="true">
                    This content will be unavailable while :is-disabled prop set to true
                  </tab>
                  <tab id="oh-hi-mark" name="Purchaser" :is-disabled="true">
                    The fragment that is appended to the url can be customized
                  </tab>
                  <tab prefix="<span class='glyphicon glyphicon-star'></span> "
                       name="Treader"
                        :is-disabled="true">
                    A prefix and a suffix can be added
                  </tab>
                  <tab name="Professional Service" :is-disabled="true">
                    This content will be unavailable while :is-disabled prop set to true
                  </tab>
                </tabs>


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
    import profile_left_nav from '@/components/views/users/profile-left-nav';
    import {Tabs, Tab} from 'vue-tabs-component';
    import 'vue-tabs-component/docs/resources/tabs-component.css';
    import axios from 'axios';
    export default {
        name: 'profile',
        data () {
            return {
                current_profile_id:-1,
                loading:false,
                success:null,
                error_text:null,
                submitted:false,

                acc_code:'',
                name:'',
                email:'',
                mobile:'',
                avatar:null,
                user_country_name:'',
                dateofbirth:'',
                created_at:'',

                company_name:'',
                company_mobile:'',
                company_email:'',
                company_address:'',
                company_sub_company:'',
                company_type_id:'',
                company_type_name:'',
                company_type_ids:new Array(),

                education_name:'',
                education_type:'',

                bank_name:'',
                account_type:'Savings',
                account_number:'',
                branch_name:'',

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

                countries:new Array(),
            }
        },
        components:{
            profile_left_nav:profile_left_nav,Tabs,Tab
        },
        mounted(){
            this.current_profile_id=this.$router.currentRoute.params.id;
            this.acc_code=this.current_profile_id;
            this.getCountries();
        },
        methods:{
            getInformation(){
                var formData = new FormData();
                formData.append('user_id', this.current_profile_id-100000000);
                axios.post(this.$host+'get_user_profile',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                    .then((response) => {
                        this.loading = false;
                        let alldata=response.data;
                        if(alldata.length==0){
                            this.goHome();
                        }
                        if(alldata.user.id){
                            this.name=alldata.user.name;
                            this.email=alldata.user.email;
                            this.mobile=alldata.user.mobile;
                        }
                        if(alldata.information.id){
                            this.avatar=alldata.information.avatar;
                            this.dateofbirth=alldata.information.dateofbirth;
                            this.created_at=alldata.information.created_at;
                            this.user_country_name=this.countries[alldata.information.country_id];
                        }

                        if(alldata.company.id){
                            this.company_name=alldata.company.name;
                            this.company_mobile=alldata.company.mobile;
                            this.company_email=alldata.company.email;
                            this.company_address=alldata.company.address;
                            this.company_sub_company=alldata.company.sub_company;
                            this.company_type_name=this.company_type_ids[alldata.company.type_id];
                        }

                        if(alldata.bank.id){
                            this.bank_name=alldata.bank.bank_name;
                            this.account_type=alldata.bank.account_type;
                            this.account_number=alldata.bank.account_number;
                            this.branch_name=alldata.bank.branch_name;
                        }

                        if(alldata.educations[0].id){
                            this.education_name=alldata.educations[0].name;
                            this.education_type=alldata.educations[0].education_type;
                        }

                        if(alldata.addresses.id){
                            this.billing_flat_plot=alldata.addresses.billing_flat_plot;
                            this.billing_address=alldata.addresses.billing_address;
                            this.billing_city=alldata.addresses.billing_city;
                            this.billing_state=alldata.addresses.billing_state;
                            this.billing_zipcode=alldata.addresses.billing_zipcode;
                            this.billing_country_id=alldata.addresses.billing_country_id;
                            if(this.countries.length>0){
                                this.billing_country_name=this.countries[this.billing_country_id];
                            }

                            this.shipping_flat_plot=alldata.addresses.shipping_flat_plot;
                            this.shipping_address=alldata.addresses.shipping_address;
                            this.shipping_city=alldata.addresses.shipping_city;
                            this.shipping_state=alldata.addresses.shipping_state;
                            this.shipping_zipcode=alldata.addresses.shipping_zipcode;
                            this.shipping_country_id=alldata.addresses.shipping_country_id;
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
                        }
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            getCompanyTypes(){
                const formData = new FormData();
                let self=this;
                axios.post(this.$host+'getCompanyTypes',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data.length>0){
                            let len=response.data.length;
                            for(let i=0;i<len;i++){
                                this.company_type_ids[response.data[i].id]=response.data[i].name;
                            }
                        }
                        this.getInformation();
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
                        if(response.data.length>0){
                            let len=response.data.length;
                            for(let i=0;i<len;i++){
                                this.countries[response.data[i].CountryId]=response.data[i].name;
                            }
                        }
                        this.getCompanyTypes();
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            tabClicked (selectedTab) {
                console.log('Current tab re-clicked:' + selectedTab.tab.name);
            },
            tabChanged (selectedTab) {
                console.log('Tab changed to:' + selectedTab.tab.name);
            },
            goHome() {
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="css" scoped>

.profile_left_nav{
  text-align: center;
}

.profile_left_nav p{
  line-height: 1.8 !important;
}

.profile_left_nav h5{
  margin-top:15px;
  background: #7ABE41;
  color: #fff;
  padding: 7px;
}
</style>
