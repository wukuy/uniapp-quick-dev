// 配置请求主路径

// #ifndef MP-WEIXIN
export const API_URL = import.meta.env.VITE_API_URL
// #endif

// #ifdef MP-WEIXIN
const envVersion = uni.getAccountInfoSync().miniProgram.envVersion
let url = ''
let envName = ''

console.log(envVersion)
if(envVersion === 'develop' || envVersion === 'trial') {
    url = import.meta.env.VITE_API_TEST_URL

    if(envVersion === 'develop') {
        envName = '开发'
    }else {
        envName = '体验'
    }
}else {
    url = import.meta.env.VITE_API_PROD_URL
    envName = '正式'
}

console.log(`当前小程序版本为: ${envName}`)
console.log(`接口url: ${url}`)
export const API_URL = url
// #endif
