const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            //3000번에서 줄떄 5000번에 주겠다
            changeOrigin: true,
        })
    );
};