<template>
  <div class="profile m-t">
    <div class="block-content">
      <div class="form-group row">
        <div class="col-md-12">
          <div class="preview">

            <img class="user_avatar" v-if="avatar!=''" :src="$host_domain+'/'+avatar" style="max-width: 200px" alt=""/>

            <img v-else src="/static/assets/images/default-user-avatar.png" style="max-width: 200px" alt=""/>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {

        name: 'profile-left-nav',

        data () {
            return {
                loading:false,
                avatar:'',
            }
        },
        methods:{
            logout() {
                let email=this.$store.getters.getUser.email;

                this.$store.dispatch('setUser','')
                this.$router.push('/');
            }
        },
        watch:{
            $route (to, from){
              //alert(9);
            }
        },
        mounted(){
            this.uid= this.$route.params.id;
        }
    }
</script>

<style lang="css" scoped>

</style>
