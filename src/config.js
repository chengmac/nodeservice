/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:11 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-12-20 21:41:54
 */

// 访问端口
exports.APP = {
    port: 5000
};

// 数据库访问地址
exports.MONGODB = {
    uri: `mongodb://39.105.165.222:27017/nodeService`
};

//
exports.AUTH = {
    data: { user: 'root' },
    jwtTokenSecret: 'node',
    defaultPassword: 'javascript',
    defaultUsername: 'chengmac'
};
