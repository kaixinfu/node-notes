/**
 * 请求拦截:黑名单中存在的ip访问将被拒绝
 * 请求拦截应用非常广泛:登录状态验证、CORS头设置等
 */
function iptable() {
    return async (ctx, next) => {
        // console.log('ctx', ctx);
        const { req, res } = ctx;
        const info = getReqInfo(req);
        const blackIps = ['127.0.0.1'];
        console.log('info', info, blackIps.includes(info));
        if (blackIps.includes(info)) {
            res.body = '无权限访问'
        } else {
            await next()
        }

    }
}
function getReqInfo(req) {
    // console.log('req["x-forwarded-for"]', req.headers["x-forwarded-for"]);
    // console.log('req.connection.remoteAddress', req.connection.remoteAddress);
    // console.log('req.socket.remoteAddress', req.socket.remoteAddress);
    // console.log('req.connection.socket.remoteAddress', req.connection.socket.remoteAddress);

    return (
        req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP 
        req.connection.remoteAddress || // 判断 connection 的远程 IP 
        req.socket.remoteAddress || // 判断后端的 socket 的 IP 
        req.connection.socket.remoteAddress
    );
}
module.exports = iptable