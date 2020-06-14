<template>
  <div>
    <form class="theme-form" id="educationElements" @submit.prevent="process" >
      <div class="msg-nwts-vue" v-if="error_text">
        <div class="alert alert-danger" v-html="error_text"></div>
      </div>
      <div class="msg-nwts-vue" v-if="success">
        <div class="alert alert-success" v-html="success"></div>
      </div>
      <div class="form-row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Education Name *</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Your Education name" v-validate="'required'" v-model="name" name="name">
            <p v-if="submitted && errors.has('name')" class="error-message">{{ errors.first('name') }}</p>
          </div>
        </div>
        <div class="col-md-12 select_input">
          <div class="form-group">
            <label >Education Type *</label>
            <select class="form-control" id="education_type" size="1" v-validate="'required'" v-model="education_type" name="education_type" >
              <option>Select</option>
              <option>Master's</option>
              <option>Bachelor's</option>
              <option>HSC</option>
              <option>Others</option>
            </select>
            <p v-if="submitted && errors.has('education_type')" class="error-message">{{ errors.first('education_type') }}</p>
          </div>
        </div>


        <div class="col-sm-6">
          <div class="form-group">
            <div class="preview">
              <a v-if="certificate_file!=''" href="$host_domain+'/'+certificate_file" target="_blank"><img class="user_avatar" v-if="certificate_file!=''" src="/static/assets/images/has-image.jpg" style="margin-bottom10px;max-width: 200px" alt=""/></a>
              <img v-else src="/static/assets/images/no-image.jpg" style="margin-bottom10px; max-width: 200px" alt=""/>
            </div>
          </div>
          <div class="form-group modal-file-upload">
            <label for="">Certificate File</label>
            <input style="padding:0" type="file" id="user-certificate_file" name="certificate_file">
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

        props:['education_name'],
        name: 'user_company',

        data () {
            return {
                loading:false,
                name:'',
                education_type:'',
                certificate_file:'',
                success:null,
                success_avatar:null,
                loading: false,
                error_text:null,
                error_text_avatar:null,
                submitted:false,

                education_name:'Anavasoft'
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
                        var form = document.getElementById('educationElements');
                        var formData = new FormData(form);
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'setEducation',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
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
                axios.post(this.$host+'get_user_education',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data.user_id){
                            this.name=response.data.name;
                            this.education_type=response.data.education_type;
                            this.certificate_file=response.data.certificate_file == null ? '' : response.data.certificate_file;
                            //self.$emit('company_name',response.data.name);
                            self.$parent.education_name=response.data.name;
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

