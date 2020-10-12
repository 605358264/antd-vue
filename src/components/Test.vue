<template>
<div>
  <a-button @click="addM">add1</a-button>
  <a-table :columns="columns" :data-source="data" :rowKey="(record,index)=>{return index}" bordered>
    <template
      v-for="col in ['name', 'age', 'address','date','sex']"
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
    width: '15%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '15%',
    scopedSlots: { customRender: 'address' },
  },
  {
      title:"sex",
       dataIndex: 'sex',
       width: '15%',
    scopedSlots: { customRender: 'sex' },

  },
  {
      title:"date",
       dataIndex: 'date',
       width: '15%',
    scopedSlots: { customRender: 'date' },

  },
 
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    sex:'男',
    date:'2020-01-02',
   
  });
}
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
          {type:'input',prop:'age',label:'age',selectArr:[ {value:1,key:1},
        {value:2,key:2}],disabled:false},
          {type:'textArea',prop:'address',label:'address',disabled:false},
          {type:'dateP',prop:'date',label:'date',disabled:false}
         
      ],
      title:"title",
      form: {
        name: "",
        age:"",
        address:"",
        sex:"男",
        date:"",
       
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
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("this.data") ) {
        this.data=JSON.parse(sessionStorage.getItem("this.data"))
        this.cacheData=this.data
    } 
 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("this.data",JSON.stringify(this.data))
    })
  }
,
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
      console.log(this.editingKey,'09')
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
        this.form={name: "",
        age:"",
        address:"",
        sex:"男",
        date:"",
       }
        this.visible=true 
    },
    ok(form){
    
    
            form.date=moment(form.date).format('YYYY-MM-DD')
        form.key=this.data.length+1
        this.data.push(form)
       // this.cacheData.push(form)
       // Vue.set(this.data,this.data.length-1,form)
        this.visible=false
      
         
    },
    
    typeNumber(rule,value,callback){
       value=this.form.age
       console.log(value)
  
     
        
    }
        
        
    
  },
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>