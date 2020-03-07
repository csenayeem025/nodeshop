<template>
  
	<div class="modal" :class="[{'is-active': modalshow}, modifiers]" id="modal">
		<div class="modal-background" @click.stop="close()"></div>
		<div class="modal-content">
			 <div class="box" v-show="modalshow">
  				<slot></slot>
  			</div>
      <!-- <transition name="modal"
      enter-active-class="animated zoomIn animated-4x"
      leave-active-class="animated zoomOut"
      >
      </transition> -->
		</div>
		<button class="modal-close is-large" aria-label="close" @click="close()"></button>
	</div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'modal',
  props:['show','modifiers'],
  data () {
    return {
    	modalshow: false,
      email: '',
      password: '',
      loading: false,
      error: '',
      sloading: false,
      sname:'',
      semail:'',
      spassword: '',
      cpassword: ''
    }
  },
  watch:{
  	show(){
  		this.modalshow = this.show
  	}
  },
  methods:{
    ...mapActions([
      'setHead'
    ]),
  	close(){
  		this.modalshow = false
  		this.$emit('update:show',false)
      if(this.$route.params.uri){
        const head = {
          title: this.$route.params.uri+" | grocery",
          description: "This is a grocery shop"
        }
      }else{
        const head = {
          title: this.$route.name+" | grocery",
          description: "This is a grocery shop"
        }
      }
      this.setHead(head)
  	}
  },
  mounted(){

  }
}
</script>

<style lang="css" scoped>
	#modal{
		z-index: 9999!important;
	}
  .is-default .modal-content{
    width: 640px !important;
  }
  .is-large .modal-content{
    width: 1024px !important;
  }

  .is-small .modal-content{
    width: 450px!important;
  }

  div::-webkit-scrollbar {
      width: 5px !important;
  }

  div::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
      border-radius: 10px;
  }

  div::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }




</style>