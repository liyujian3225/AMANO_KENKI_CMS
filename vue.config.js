const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/cms/',
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/api': {
        target: 'http://163.43.183.26:8000/api', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' //请求的时候使用这个api就可以
        }
      },
      '/auth': {
        target: 'http://163.43.183.26:8000/auth', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/auth': '' //请求的时候使用这个api就可以
        }
      }
    }
  }
})
