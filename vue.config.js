const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    proxy: 'https://album-0jz2.onrender.com'
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/Album_Frontend2/',
}


