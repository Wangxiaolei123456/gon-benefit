const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8080,
    open: true,
    https: false,
    proxy: {
      "/upImage": {
        target: "http://file.upticknft.com/v2/image/upload/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/upImage": "/",
        },
      },

      "/upVideo": {
        target: "http://file.upticknft.com/file/upload/video/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/upVideo": "/",
        },
      },

    }
  
  },
})
