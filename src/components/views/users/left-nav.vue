<template>
  <div class="profile m-t">
    <div class="block-content is_left_menu">
      <ul>
        <li class="isActive"><router-link :to="{path: '/dashboard/'}">Dashboard</router-link></li>
        <li class="isActive"><router-link target="_blank" :to="{path: '/profile/'+(100000000+uid)}">My Profile</router-link></li>
        <li class="isActive"><router-link :to="{path: '/myorders/'}">My Orders</router-link></li>
        <li class="isActive"><router-link :to="{path: '/mywishlist/'}">My Wishlist</router-link></li>
        <li class="isActive"><router-link :to="{path: '/addressbook/'}">Address Book</router-link></li>
        <li class="isActive"><router-link :to="{path: '/myaccount/'}">My Account</router-link></li>
        <li class="isActive"><router-link :to="{path: '/changepassword/'}">Change Password</router-link></li>
        <li class="last">
          <a href="javascript:void(0);" @click="logout">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        // beforeRouteUpdate (to, from, next) {
        //     next();
        // },
        // route: {
        //     data() {
        //         console.log('The current ID is ' + this.$route);
        //     }
        // },
        name: 'left-nav',

        data () {
            return {
                loading:false,
                uid:'',
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
              alert(9);
            }
        },
        mounted(){
            this.uid=this.$store.getters.getUser.id;
            let route_name=this.$router.currentRoute.name;
            if(route_name=='dashboard'){
                document.querySelectorAll('.is_left_menu li')[0].classList.add('active');
            }else if(route_name=='myorders'){
                document.querySelectorAll('.is_left_menu li')[2].classList.add('active');
            }else if(route_name=='mywishlist'){
                document.querySelectorAll('.is_left_menu li')[3].classList.add('active');
            }else if(route_name=='addressbook'){
                document.querySelectorAll('.is_left_menu li')[4].classList.add('active');
            }else if(route_name=='myaccount'){
                document.querySelectorAll('.is_left_menu li')[5].classList.add('active');
            }else if(route_name=='changepassword'){
                document.querySelectorAll('.is_left_menu li')[6].classList.add('active');
            }
        }
    }
</script>

<style lang="css" scoped>

</style>
