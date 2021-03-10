/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
// import { Notify } from 'vant'
import qs from 'qs'
// import signRan from './makesign'
// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'https://openapi.dataoke.com/'
  // baseURL: process.env.NODE_ENV === 'production'
  //   ? 'http://api-toutiao-web.itheima.net'
  //   : 'http://ttapi.research.itcast.cn/'
})

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
/* 请求验签 */
const md5 = require('md5')
// 新增输入参数：

// Nonce：一个6位的随机数
function randomn (n) {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  const appKey = '5da24dcbcde8b'
  // const version = 'v1.2.3'
  const version = 'v2.1.2'
  const nonce = randomn(6)
  // Timer：毫秒级时间戳
  const timer = new Date().getTime()
  // console.log(timer)
  // 验签步骤：
  const appSecret = 'fbd96b5305266ee2a1ace48763d14178'// 应用的Secret
  // const version = 'v1.2.0' // API接口版本号
  // 1、将当前应用的appkey，appsecret，nonce参数和timer参数进行组装，
  // 拼接成字符串：appKey=xxx&timer=xxx&nonce=xxx&key=xxx （key对应appsecret）
  const str = `appKey=${appKey}&timer=${timer}&nonce=${nonce}&key=${appSecret}`
  // 2、将刚才拼接的字符串进行md5加密并将加密结果转成大写
  const signRan = md5(str).toLocaleUpperCase()

  // 判断请求的类型
  // 如果是post请求就把默认参数拼到data里面
  // 如果是get请求就拼到params里面
  if (config.method === 'post') {
    const data = qs.parse(config.data)
    config.data = qs.stringify({
      appKey,
      version,
      signRan,
      nonce,
      timer,
      ...data
    })
  } else if (config.method === 'get') {
    config.params = {
      appKey,
      version,
      signRan,
      nonce,
      timer,
      ...config.params
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
// request.interceptors.response.use(
//   response => {
//     return response
//   },
//   async error => {
//     if (error.response && error.response.status === 401) {
//       // 校验是否有 refresh_token
//       const user = store.state.user

//       if (!user || !user.refresh_token) {
//         // router.push('/login')
//         redirectLogin()

//         // 代码不要往后执行了
//         return
//       }

//       // 如果有refresh_token，则请求获取新的 token
//       try {
//         const res = await axios({
//           method: 'PUT',
//           url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
//           headers: {
//             Authorization: `Bearer ${user.refresh_token}`
//           }
//         })

//         // 如果获取成功，则把新的 token 更新到容器中
//         store.commit('setUser', {
//           ...user,
//           token: res.data.data.token // 最新获取的可用 token
//         })

//         // 把之前失败的用户请求继续发出去
//         // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
//         // return 把 request 的请求结果继续返回给发请求的具体位置
//         return request(error.config)
//       } catch (err) {
//         // 如果获取失败，直接跳转 登录页
//         console.log('请求刷线 token 失败', err)
//         // router.push('/login')
//         redirectLogin()
//       }
//     } else if (error.response.status === 500) {
//       Notify('服务端异常，请稍后重试')
//     }
//     return Promise.reject(error)
//   }
// )

// function redirectLogin () {
//   router.push({
//     name: 'login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   })
// }

export default request
