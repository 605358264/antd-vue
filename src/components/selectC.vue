<template>
  <div class="hello">
    <a-select :value="current" @change="handleChange" style="width:300px" v-model="current">
      <a-select-option value="1">1</a-select-option>
       <a-select-option value="2">2</a-select-option>
        <a-select-option value="3">3</a-select-option>
    </a-select>
  </div>
</template>

<script>

export default {
 props:{
   currentKey:String
 },
  data () {
    return {
       current:''
    }
  },
  components:{

  },
  methods:{
    handleChange(v){
      console.log(v)
      this.$emit('change',v)
    }
  },
  mounted(){
    //this.currentKey=this.current
  }

}
</script>


<style scoped>

</style>