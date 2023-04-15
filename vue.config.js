const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// module.exports = {
// 	devServer: {
// 		open: false, // 是否自动打开浏览器
// 		port: 8083, // 本地的端口
// 		https: false, // 不开启https
// 		proxy: {
// 			'api': {
// 				target: 'http://114.55.239.213:8087', // 后端地址
// 				ws: true,  // 开启跨域
// 				changeOrigin: true,
// 				pathRewrite: {
// 					'^/api':''
// 				}
// 			}
// 		}
// 	}
// };
