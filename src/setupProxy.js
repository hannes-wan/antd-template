const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        //遇见/apis前缀的请求，就会触发该代理配置
        createProxyMiddleware('/apis',{
            target:'http://localhost:8080',
            changeOrigin:true,
            // 一般情况下要 pathRewrite:{'^/apis':''}，但是刚好后端api的地址前缀/apis和这里定义的名称相同
            // 如果这里写成 {'^/apis':''}，那么实际访问的 api 地址就是 "http://localhost:8080/xxx"
            pathRewrite:{'^/':''}
        }),
        // 如果有更多跨域需求，可以继续定义
        // proxy({})
    )
};