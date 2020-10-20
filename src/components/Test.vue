<template>
<div>
 <a-form :form="form">
      <a-form-item label="选择1">
        <selectC onchange="select1" :currentKey="currentKey" v-model="a"/>
      </a-form-item>
      <a-form-item label="选择2">
        <selectC  onchange="select2" :currentKey="currentKey" v-model="b"/>
      </a-form-item> 
    </a-form>
</div>
</template>
<script>

import SelectC from './selectC'



export default {
  data() {
   
    return {
 
      form:{},
      currentKey:'',
      a:'',
      b:''
   }
  },
  components:{
SelectC,
  },

mounted(){

},
  methods: {
select1(v){
console.log(v,'v1')
this.currentKey=v
},
select2(v){
console.log(v,'v2')

}
  },
}
</script>
<style scoped>

</style>