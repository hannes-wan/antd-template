import axios from 'axios'
import { message } from "antd";
import JSONBIG from "json-bigint"

const instance = axios.create({
    // 单位毫秒
    timeout: 3000,
    //如需要携带cookie 该值需设为true
    withCredentials: true
})

// 避免 long 的 id 显示不全
instance.defaults.transformResponse = [
    function (data) {
        return JSONBIG({
            storeAsString: true
        }).parse(data)
    }
]

// axios请求拦截器
instance.interceptors.request.use(config => {
    // 如果存在token
    if (window.localStorage.getItem('token')) {
        // 把token放入headers，命名为token
        config.headers['token'] = window.localStorage.getItem('token');
    }

    return config;

},error => {
    return Promise.reject(error);
})

// axios响应拦截器配置
instance.interceptors.response.use(success => {
    // 业务逻辑错误
    if (success.status && success.status === 200) {
        if (success.data.code !== 200
            // 如果请求是 /apis/account/info，跳过
            && success.request.responseURL.substring(success.request.responseURL.length-18, success.request.responseURL.length) !== "/apis/account/info"
        ) {
            message.error(success.data.message);
            return;
        }
    }

    return success.data;

    // 非success错误
}, error => {

    message.error(error.message)

    return Promise.reject(error)
})

export default instance