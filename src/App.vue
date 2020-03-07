<template>
  <div id="app" class="has-navbar-fixed-top">

     <div id="preloader-background">
        <div id="spinners">
            <div id="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>

    <div id="page" class="site">


      <vue-headful
      :title="headful.title"
      :description="headful.description"
      >

      </vue-headful>

      <div v-if="invoice">
        <invoice></invoice>
      </div>
      <div v-else>
        <navbar></navbar>
        <container></container>
        <div class="loading" v-show="masterLoading"></div>
        <notifications
        group="groce"
        position="bottom right"
        :classes="notify.type"
        animation-type="velocity"
        >
        </notifications>
      </div>

      </div>

  </div>
</template>

<script>

import container from '@/components/layouts/container'
import navbar from '@/components/layouts/navbar'
import modal from '@/components/elements/modal'
import cfooter from '@/components/layouts/footer'
import invoice from "@/components/views/invoice"
import _ from 'lodash'

var color = require('dominant-color')

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      invoice: false,
      notif: false
    }
  },
  components: {
      container,navbar,modal,cfooter,invoice
  },
  methods:{
    checkInvoice(){
      if(this.$route.name === 'invoice'){
        this.invoice = true
      }else{
        this.invoice = false
      }
    },
    ...mapActions([
      'togglenav',
      'setMasterLoading',
      'setNotification'
      ]),
    screenResize(){
      if(this.$mq.below(1023)){
        this.$store.dispatch('changesideshow',false)
      }else if(this.$mq.above(1024)){
        this.$store.dispatch('changesideshow',true)
      }
    }
  },
  watch:{
    '$mq.resize': 'screenResize',
    '$route' : 'checkInvoice',
    notify(value){
      this.$notify(this.notify)
    }
  },
  created(){
    //console.log("Cookie")
    //console.log(this.$cookie.get('browser_id'))

    const browser_id = _.random(1,99999999)

    if(!this.$cookie.get('browser_id')){
      this.$cookie.set('browser_id',browser_id)
    }
    //console.log("updated browser_id: "+ this.$cookie.get('browser_id'))
  },
  mounted(){
    this.checkInvoice()
    this.setMasterLoading(false)
  },
  computed:{
    ...mapGetters({
      'masterLoading' : 'getMasterLoading',
      'notify' : 'getNotification',
      'headful' : 'getHead'
    })
  }
}
</script>

<style>

  .modal-backdrop.show{
    opacity:1 !important;
    background-color: transparent !important;
    z-index: -9000;
  }

</style>
