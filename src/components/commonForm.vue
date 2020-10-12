<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="commonForm">
    <a-form-model-item v-for="(item,index) in dataArr" :key="index"  :label="item.label" :prop="item.prop">
      <a-input v-model="form[item.prop]"  v-if="item.type=='input'" />
      <a-input-number v-model="form[item.prop]"  v-if="item.type=='inputNumber'"/>
      <a-radio-group v-if="item.type=='radio'" v-model="form[item.prop]" :disabled="item.disabled">
          <a-radio  value="男">男</a-radio>
           <a-radio value="女" >女</a-radio>
      </a-radio-group>
      <a-select v-if="item.type=='select'" v-model="form[item.prop]"  :disabled="item.disabled" >
          <a-select-option v-for="i in item.selectArr" :key="i.key" :value="i.key">
                    {{ i.value }}
                  </a-select-option>
      </a-select>
       
       <a-textarea  v-model="form[item.prop]" v-if="item.type=='textArea'"  :disabled="item.disabled" />
        
 <a-date-picker v-model="form[item.prop]"  v-if="item.type=='dateP'" @change="onChange" :disabled="item.disabled" />

    </a-form-model-item>
  </a-form-model>
</template>
<script>
import moment from 'moment'
export default {
    props:{
        form:Object,
        dataArr:Array,
        rules:Object
    },
  data() {
    
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
     dateFormat: 'YYYY-MM-DD',
      date: moment(this.form.date, 'YYYY-MM-DD')
    };
  },
  methods: {
     onChange (date, dateString) {
    //  this.dateString = dateString
      // console.log(date, dateString)
      console.log(dateString,'dateString')
      this.form.date=dateString
    },
    moment,
    onSubmit() {
     
    },
    validateField(){
      return this.$refs.commonForm.validateField
    }
  },
  mounted(){
    
   
   
  }
};
</script>