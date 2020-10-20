<template>
  <div>
    <a-button @click="addM">add</a-button>
  
    <a-table :columns="columns" :data-source="data" :rowClassName="setRowClassName" bordered>
      <template
        v-for="col in callArr"
        :slot="col.label"
        slot-scope="text, record, index"
      >
        <div :key="col.label">
          <div v-if="record.editable">
            <a-form-model :rules="rules" :model="record">
              <a-form-model-item :prop="col.label">
                <a-input
              v-if="record.editable && col.type == 'input'"
              :value="text"
              @change="
                (e) => handleChange(e.target.value, record.key, col.label)
              "
            />
            <a-input-number
              v-if="record.editable && col.type == 'inputNumber'"
              :value="text"
              @change="(e) => InputNumberChange(e, record.key, col.label)"
            />
            <a-select
              v-if="record.editable && col.type == 'select'"
              @change="(e) => selectChange(e, record.key, col.label)"
              :value="text"
            >
              <a-select-option
                v-for="i in selectArr"
                :key="i.key"
                :value="i.key"
              >
                {{ i.value }}
              </a-select-option>
            </a-select>
            <a-radio-group
              v-if="record.editable && col.type == 'radio'"
              :value="text"
              @change="
                (e) => selectChange(e.target.value, record.key, col.label)
              "
            >
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
            <a-date-picker
              v-if="record.editable && col.type == 'datePicker'"
              :valueFormat="dateFormat"
              :value="text"
              @change="(e) => dateChange(e, record.key, col.label)"
            ></a-date-picker>
            <a-textarea
              v-if="record.editable && col.type == 'textArea'"
              :value="text"
              @change="
                (e) => selectChange(e.target.value, record.key, col.label)
              "
            />
              </a-form-model-item>
              
            </a-form-model>
            
          </div>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
            <a @click="() => delP(record.key)">del</a>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >Edit</a
            >
          </span>
        </div>
      </template>
      <template> </template>
    </a-table>
    <a-modal v-model="visible" :title="title" @ok="ok(form)">
      <compont
        :is="componentName"
        :form="form"
        :dataArr="dataArr"
        :rules="rules"
        ref="componentN"
      ></compont>
    </a-modal>
  </div>
</template>
<script>
import CommonForm from "./commonForm";
import moment from "moment";
import { tableMock, diqu,callArr } from "../api/index.js";
const columns = [
  {
    title: "name",
    dataIndex: "name",
    status: 1,
    scopedSlots: { customRender: "name" },
  
  },
  {
    title: "age",
    dataIndex: "age",
    status: 1,
    scopedSlots: { customRender: "age" },
  },
  {
    title: "address",
    dataIndex: "address",
    status: 1,
    scopedSlots: { customRender: "address" },
      render:(text,record,index)=>{
      console.log(record,'record')
    }
  },
  {
    title: "sex",
    dataIndex: "sex",
    status: 1,
    scopedSlots: { customRender: "sex" },
  },
  {
    title: "date",
    dataIndex: "date",
    status: 1,
    scopedSlots: { customRender: "date" },
  },
  {
    title: "area",
    dataIndex: "area",
    status: 1,
    scopedSlots: { customRender: "area" },
  },
  {
    title: "operation",
    dataIndex: "operation",
    status: 1,
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
for (let i = 0; i < 15; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    sex: "男",
    date: "2020-01-01",
    area: 1,
  });
}
export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      editingKey: "",
      componentName: CommonForm,
      title: "title",
      visible: false,
      dataArr: [
        { type: "input", prop: "name", label: "name", disabled: false },
        { type: "radio", prop: "sex", label: "sex", disabled: true },
        { type: "inputNumber", prop: "age", label: "age", disabled: false },
        {
          type: "textArea",
          prop: "address",
          label: "address",
          disabled: false,
        },
        { type: "dateP", prop: "date", label: "date", disabled: false },
        {
          type: "select",
          prop: "area",
          label: "area",
          selectArr: [
            { value: 1, key: 1 },
            { value: 2, key: 2 },
          ],
          disabled: false,
        },
      ],
      selectArr: [
        { value: 1, key: 1 },
        { value: 2, key: 2 },
      ],
      callArr: [
       
      ],
      form: {
        name: "",
        age: "",
        address: "",
        sex: "男",
        date: null,
        area: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
          { validator: this.typeNumber },
        ],
        address: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        sex: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
      },
      dateFormat: "YYYY-MM-DD",
    };
  },
  components: {
    CommonForm,
  },
  created() {},
  mounted() {
    this.callArrQ()
     this.getData();
    this.getDiQu();
    this.columns.map((item, index) => {
      if (item.status == 2) {
        this.columns.splice(index, 1);
      }
    });
   

    /*
 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("this.data",JSON.stringify(this.data))
        sessionStorage.setItem("cacheData",JSON.stringify(this.cacheData))
    })
    //在页面加载时读取sessionStorage里的状态信息
  
        this.data=JSON.parse(sessionStorage.getItem("this.data"))
        console.log(this.data,'data')
        this.cacheData=this.data
       //  this.cacheData=JSON.parse(sessionStorage.getItem("cacheData"))
        this.$forceUpdate()
    
  */
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      console.log(target, "target");
      console.log(column, "column");
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    InputNumberChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    selectChange(value, key, column) {
      console.log(value, "value");
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    dateChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },

    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      target.editable=false
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
      sessionStorage.setItem("this.data", JSON.stringify(this.data));
      sessionStorage.setItem("cacheData", JSON.stringify(this.cacheData));
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
      sessionStorage.setItem("this.data", JSON.stringify(this.data));
      sessionStorage.setItem("cacheData", JSON.stringify(this.cacheData));
    },
    addM() {
      this.form = {
        name: "",
        age: "",
        address: "",
        sex: "男",
        date: null,
        area: null,
      };
      this.visible = true;
    },
    delP(key) {
      const data = [...this.data];
      console.log(data, "data");
      this.data = data.filter((item) => item.key !== key);
      this.editingKey = "";
      sessionStorage.setItem("this.data", JSON.stringify(this.data));
      sessionStorage.setItem("cacheData", JSON.stringify(this.cacheData));
    },
    ok(form) {
      if (!form.name) {
        return alert("请输入姓名");
      }
      if (!form.age) {
        return alert("请输入年龄");
      }
      if (!form.address) {
        return alert("请输入地址");
      }

      console.log(this.data, "data");
      form.key = this.data.length + 1;
      this.data.push(form);
      this.cacheData.push(form);
      console.log(this.data, "data1");
      // this.cacheData.push(form)
      // Vue.set(this.data,this.data.length-1,form)
      this.visible = false;
      sessionStorage.setItem("this.data", JSON.stringify(this.data));
      sessionStorage.setItem("cacheData", JSON.stringify(this.cacheData));
    },
    typeNumber(rule, value, callback) {
      value = this.form.age;
      if (!value) {
        return "年龄不能为空";
      }
      var re = /[^\d]/g;
      if (!re.test(value)) {
        callback();
      } else {
        callback("只能输入数字");
      }
    },
    getData() {
      this.data = JSON.parse(sessionStorage.getItem("this.data"));
      if (!this.data) {
        tableMock().then((res) => {
          this.data = res.data;
        });
      }
    },
    getDiQu() {
      diqu().then((res) => {
      
        this.selectArr = res.data;
      });
    },
    callArrQ(){
      callArr().then((res)=>{
        console.log(res,'res1')
        this.callArr=res.data
      })
    },
    setRowClassName (record) {
  //状态0为失败，1为成功
  console.log(record,'0009')
  return record.area === 1 ? "success" : "error"
}
 
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.error {
  color: red;
}
</style>