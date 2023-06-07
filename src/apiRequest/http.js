import axios from 'axios'
import { Loading } from 'element-ui';
import { getItem } from "@/utils/storage";

const service = axios.create({
  timeout: 1000 * 30,
})
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

let loadingInstance;
// 请求拦截
service.interceptors.request.use(config => {
  const { url, method } = config;
  //避免接口走缓冲数据
  if(method === "get") {
    url.indexOf('?') === -1 ? config.url = url+'?t='+(new Date().getTime()) : config.url = url+'&t='+(new Date().getTime())
  }
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  config.headers.Authorization = getItem("authorization") || "";
  return config
}, error => {
  return Promise.reject('请求出错')
})

// 响应拦截
service.interceptors.response.use(response => {
  loadingInstance.close();
  const { data, status } = response;
  if (status === 200) {
    return Promise.resolve(data)
  } else {
    this.$message({
      message: "参数有误，请查看！",
      type: 'error'
    })
    return Promise.reject(data)
  }
}, _error => {
  // 返回报错处理

})
export default service
