import Mock from 'mockjs';
//引入数据
import data from './data.json';
console.log('----------123-----');



Mock.mock('/tableData',{code:0,data:data.table
})
Mock.mock('/diqu',{code:0,data:data.diqu
})
Mock.mock('/callArr',{code:0,data:data.callArr})