// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Button from 'ant-design-vue/lib/button';
import Table from 'ant-design-vue/lib/table'
import Modal from 'ant-design-vue/lib/modal'
import Icon from 'ant-design-vue/lib/icon'
import Input from 'ant-design-vue/lib/input'
import InputNumber from 'ant-design-vue/lib/input-number'
import TextArea from 'ant-design-vue/lib/input'
import Select from 'ant-design-vue/lib/select'
import FormModel from 'ant-design-vue/lib/form-model'
import Radio from 'ant-design-vue/lib/radio'
import Switch from 'ant-design-vue/lib/switch'
import Datepicker from 'ant-design-vue/lib/date-picker'
import Checkbox from 'ant-design-vue/lib/checkbox'

import Popconfirm from 'ant-design-vue/lib/popconfirm'
import 'ant-design-vue/dist/antd.css';



Vue.component(Button.name, Button);

Vue.component(Table.name,Table)

Vue.component(Icon.name,Icon)
Vue.component(Popconfirm.name,Popconfirm)
Vue.component(Input.name,Input)
Vue.use(Select)
Vue.use(Modal)
Vue.use(FormModel)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Datepicker)
Vue.use(Checkbox)
Vue.use(TextArea)
Vue.use(InputNumber)

require('./mock/mock.js')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
