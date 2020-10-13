<template>
<div>
  <a-button @click="addM">add</a-button>
  <a-table :columns="columns" :data-source="data" bordered>
    <template
      v-for="col in ['name', 'age', 'address','sex','date','area']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
         <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>del</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
<a-modal v-model="visible" :title="title" @ok="ok(form)">
 <compont :is="componentName" :form="form" :dataArr="dataArr" :rules="rules" ref="componentN"></compont>
</a-modal> 
</div>
</template>
<script>
import moment from 'moment'
import SelectC from './selectC'
import RadioC from './radioC'
import InputC from './inputC'
import CommonForm from './commonForm'
import Vue from 'vue'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    status:1
  },
  {
    title: 'age',
    dataIndex: 'age',
  
    scopedSlots: { customRender: 'age' },
    status:1
  },
  {
    title: 'address',
    dataIndex: 'address',
  
    scopedSlots: { customRender: 'address' },
    status:1
  },
  {
      title:"sex",
       dataIndex: 'sex',
      
    scopedSlots: { customRender: 'sex' },
      status:1
  },
  {
      title:"date",
       dataIndex: 'date',
     
    scopedSlots: { customRender: 'date' },
    status:1
  },
  {
      title:"area",
       dataIndex: 'area',
      
    scopedSlots: { customRender: 'area' },
      status:1
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    status:1
  },
];

const data = [];

export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
      componentName:CommonForm,
      visible:false,
    
      dataArr:[
          {type:'input',prop:'name',label:'name',disabled:false},
          {type:'radio',prop:'sex',label:'sex',disabled:true},
          {type:'input',prop:'age',label:'age',disabled:false},
          {type:'textArea',prop:'address',label:'address',disabled:false},
          {type:'dateP',prop:'date',label:'date',disabled:false},
          {type:'select',prop:'area',label:'area',selectArr:[ {value:1,key:1},
        {value:2,key:2}],disabled:false}
      ],
      title:"title",
      form: {
        name: "",
        age:"",
        address:"",
        sex:"男",
        date:null,
        area:""
      },
      rules:{
        name:[{ required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },],
        age:[{ required: true, message: 'Please select Activity zone', trigger: 'change' },
      {validator:this.typeNumber}
        ],
        address:[{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        sex:[{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date:[{ required: true, message: 'Please select Activity zone', trigger: 'change' }]
      }
   };
  },
  components:{
SelectC,RadioC,InputC,CommonForm
  },

mounted(){
  this.columns.map((item,index)=>{
    if(item.status==2){
      this.columns.splice(index,1)
    }
  })
  console.log(this.data,'data')
},
  methods: {
    handleChange(value, key, column) {
        console.log(value,'v')
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      
      if (target) {
        target.editable = true;
        this.data = newData;
        
      }
    },
     save(key) {
       
      const newData = [...this.data];
   
      const newCacheData = [...this.cacheData];
     
      const target = newData.filter(item => key === item.key)[0];
    
      const targetCache = newCacheData.filter(item => key === item.key)[0];
    
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
    
    addM(){
        this.form={
          name: "",
        age:"",
        address:"",
        sex:"男",
        date:null,
        area:null
       }
        this.visible=true 
    },
    ok(form){
      if(!form.name){
        return alert('请输入姓名')
      }
      if(!form.age){
        return alert('请输入年龄')
      }
       if(!form.address){
        return alert('请输入地址')
      }
    
            //form.date=moment(form.date).format('YYYY-MM-DD')
        form.key=this.data.length+1
        this.data.push(form)
       // this.cacheData.push(form)
       // Vue.set(this.data,this.data.length-1,form)
        this.visible=false
      
         
    },
    del(v){
      const data = [...this.data];
      console.log(data,'data')
      this.data = data.filter(item => item.key !== key);
      this.editingKey=""
    
    },
    typeNumber(rule,value,callback){
       
       value=this.form.age
       if(!value){
         return '年龄不能为空'
       }
       var re=/[^\d]/g
       if(!re.test(value)){
          callback()
       }else{
        
         callback('只能输入数字')
       }
       
       
      
    }
        
        
    
  },
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>