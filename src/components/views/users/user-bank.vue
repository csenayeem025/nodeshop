<template>
  <div>
    <form class="theme-form" id="bankElements" @submit.prevent="process" >
      <div class="msg-nwts-vue" v-if="error_text">
        <div class="alert alert-danger" v-html="error_text"></div>
      </div>
      <div class="msg-nwts-vue" v-if="success">
        <div class="alert alert-success" v-html="success"></div>
      </div>
      <div class="form-row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="bank_name">Bank Name *</label>
            <input type="text" class="form-control" id="bank_name" placeholder="Enter Your Bank name" v-validate="'required'" v-model="bank_name" name="bank_name">
            <p v-if="submitted && errors.has('bank_name')" class="error-message">{{ errors.first('bank_name') }}</p>
          </div>
        </div>
        <div class="col-md-12 select_input">
          <div class="form-group">
            <label >Education Type *</label>
            <select class="form-control" id="account_type" size="1" v-validate="'required'" v-model="account_type" name="account_type" >
              <option>Select</option>
              <option>Savings</option>
              <option>Currents</option>
              <option>Others</option>
            </select>
            <p v-if="submitted && errors.has('account_type')" class="error-message">{{ errors.first('account_type') }}</p>
          </div>
        </div>


        <div class="col-md-12">
          <div class="form-group">
            <label for="account_number">Account Number *</label>
            <input type="text" class="form-control" id="account_number" placeholder="Enter Account Number" v-validate="'required'" v-model="account_number" name="account_number">
            <p v-if="submitted && errors.has('account_number')" class="error-message">{{ errors.first('account_number') }}</p>
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <label for="branch_name">Branch Name *</label>
            <input type="text" class="form-control" id="branch_name" placeholder="Enter Branch Name" v-validate="'required'" v-model="branch_name" name="branch_name">
            <p v-if="submitted && errors.has('branch_name')" class="error-message">{{ errors.first('branch_name') }}</p>
          </div>
        </div>

        <div class="col-md-12">
          <button class="btn btn-sm btn-normal mb-lg-5">Save</button>
        </div>
      </div>
    </form>
    <!-- section end -->
    <div class="loader-wrapper" v-if="loading==true">
      <div>
        <img src="/static/themes/assets/images/loader.gif" alt="loader">
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {

        props:['bank_name'],
        name: 'user_company',

        data () {
            return {
                loading:false,
                bank_name:'',
                account_type:'Savings',
                account_number:'',
                branch_name:'',
                success:null,
                success_avatar:null,
                loading: false,
                error_text:null,
                error_text_avatar:null,
                submitted:false,

                bank_name:'Anavasoft'
            }
        },
        components:{

        },
        mounted(){
            this.getCompanyTypes();
        },
        computed(){

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
                        var form = document.getElementById('bankElements');
                        var formData = new FormData(form);
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'setBank',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
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
            getCompanyTypes(){
                this.getInformation();
            },
            getInformation(){
                var formData = new FormData();
                formData.append('user_id', this.$store.getters.getUser.id);
                let self=this;
                axios.post(this.$host+'get_user_bank',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data.user_id){
                            this.bank_name=response.data.bank_name;
                            this.account_type=response.data.account_type;
                            this.account_number=response.data.account_number;
                            this.branch_name=response.data.branch_name;
                            //self.$emit('company_name',response.data.name);
                            self.$parent.bank_name=response.data.bank_name;
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

