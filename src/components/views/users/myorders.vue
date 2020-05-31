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
                  <h2>Manage Orders</h2></div>
                <div class="box-account box-info">
                  Coming soon...
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
export default {

  name: 'myorders',

  data () {
    return {
        loading:false
    }
  },
    components:{
        left_nav:left_nav
    },
    methods:{
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
