<template>
  <div>
    <form class="theme-form" id="compannyElements" @submit.prevent="process" >
      <div class="msg-nwts-vue" v-if="error_text">
        <div class="alert alert-danger" v-html="error_text"></div>
      </div>
      <div class="msg-nwts-vue" v-if="success">
        <div class="alert alert-success" v-html="success"></div>
      </div>
      <div class="form-row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="name">Company Name *</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Your Company name" v-validate="'required'" v-model="name" name="name">
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
              <input type="text" class="form-control"  id="email" placeholder="Email" v-model="email" name="email">
              <p v-if="submitted && errors.has('email')" class="error-message">{{ errors.first('email') }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-12 select_input">
          <div class="form-group">
            <label >Company Type *</label>
            <select class="form-control" id="company_types" size="1" v-validate="'required'" v-model="type_id" name="type_id" >
              <option value="India">India</option>

            </select>
            <p v-if="submitted && errors.has('type_id')" class="error-message">{{ errors.first('type_id') }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="address">Address</label>
            <textarea class="form-control"  id="address" placeholder="Address" name="address" v-model="address"></textarea>
            <p v-if="submitted && errors.has('address')" class="error-message">{{ errors.first('address') }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="company_address">Company Concern:</label>
            <textarea class="form-control"  id="company_address" v-model="sub_company" name="sub_company" placeholder="Company Concern"></textarea>
            <p v-if="submitted && errors.has('sub_company')" class="error-message">{{ errors.first('sub_company') }}</p>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <div class="preview">
              <a v-if="tradelicence_file!=''" href="$host_domain+'/'+tradelicence_file" target="_blank"><img class="user_avatar" v-if="tradelicence_file!=''" src="/static/assets/images/has-image.jpg" style="margin-bottom10px;max-width: 200px" alt=""/></a>
              <img v-else src="/static/assets/images/no-image.jpg" style="margin-bottom10px; max-width: 200px" alt=""/>
<!--              has-image.jpg-->
            </div>
          </div>
          <div class="form-group modal-file-upload">
            <label for="">Tradelicense File</label>
            <input style="padding:0" type="file" id="user-tradelicence_file" name="tradelicence_file">
          </div>
        </div>

        <div class="col-sm-6">
          <div class="form-group">
            <div class="preview">
              <a v-if="iso_file!=''" href="$host_domain+'/'+tradelicence_file" target="_blank"><img class="user_avatar" v-if="iso_file!=''" src="/static/assets/images/has-image.jpg" style="margin-bottom10px;max-width: 200px" alt=""/></a>
              <img v-else src="/static/assets/images/no-image.jpg" style="margin-bottom10px; max-width: 200px" alt=""/>
            </div>
          </div>
          <div class="form-group modal-file-upload">
            <label for="">ISO File</label>
            <input style="padding:0" type="file" id="user-iso_file" name="iso_file">
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

        props:['company_name'],
        name: 'user_company',

        data () {
            return {
                loading:false,
                name:'',
                mobile:'',
                email:'',
                address:'',
                sub_company:'',
                type_id:'',
                tradelicence_file:'',
                iso_file:'',
                success:null,
                success_avatar:null,
                loading: false,
                error_text:null,
                error_text_avatar:null,
                submitted:false,

                company_name:'Anavasoft'
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
                        var form = document.getElementById('compannyElements');
                        var formData = new FormData(form);
                        formData.append('user_id', this.$store.getters.getUser.id);
                        axios.post(this.$host+'setCompany',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
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
            getCompanyTypes(){
                const formData = new FormData();
                let self=this;
                axios.post(this.$host+'getCompanyTypes',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }})
                    .then((response) => {
                        this.loading = false;
                        let text='<option value="">Select</option>';
                        if(response.data.length>0){
                            this.name=response.data.name;
                            this.email=response.data.email;
                            this.mobile=response.data.mobile;

                            self.$emit('update:company_name',self.company_name);
                            //self.$parent.emit('update:company_name',self.company_name);

                            let len=response.data.length;
                            for(let i=0;i<len;i++){
                                text+='<option value="'+response.data[i].id+'">'+response.data[i].name+'</option>';
                            }
                        }
                        document.getElementById("company_types").innerHTML = text;
                        document.getElementById("company_types").value=1;// 24 bangladesh
                        this.getInformation();
                    })
                    .catch(function (error) {
                        this.loading = false;
                    });
            },
            getInformation(){
                var formData = new FormData();
                formData.append('user_id', this.$store.getters.getUser.id);
                let self=this;
                axios.post(this.$host+'get_user_company',formData, { headers: { 'Content-Type': 'multipart/form-data'  }})
                    .then((response) => {
                        this.loading = false;
                        if(response.data.user_id){
                            this.name=response.data.name;
                            this.email=response.data.email;
                            this.mobile=response.data.mobile;
                            this.address=response.data.email;
                            this.sub_company=response.data.sub_company;
                            this.type_id=response.data.type_id;
                            this.tradelicence_file=response.data.tradelicence_file == null ? '' : response.data.tradelicence_file;
                            this.iso_file=response.data.iso_file == null ? '' : response.data.iso_file;
                            //self.$emit('company_name',response.data.name);
                            self.$parent.company_name=response.data.name;
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

