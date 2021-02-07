import axios from 'axios'
export function request(config) {
  //1.axios创建实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    responseType: 'json'
  })
  //2.axios的拦截器
  instance.interceptors.request.use(config=>{
    //console. log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //1 3.某些网络请求(比如登录(token)), 必须携带一 些特殊的信息
    return config 
  },err=>{
    console.log(err)
  })
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
  //3.发送真正的网络请求
  return instance(config)
}


// export function request(config){
//     const instance=axios.create({
//       baseURL:'http://localhost:3000/',
//       timeout:3000,
//       responseType:'json'
//     })
//     return new Promise((resolve,reject)=>{
//       instance(config)
//         .then(data => {
//           resolve(data.data)
//         })
//         .catch(err=>{
//           reject(err)
//         })
//     })
// }
