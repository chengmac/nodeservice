/*
 * @Author: chengmac
 * @Date: 2018-11-05 20:27:13
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-09 11:25:06
 */

const { handleError, handleSuccess } = require('../utils/handle');
const Message = require('../models/message.model');
const messageCtrl = {};
const { ApiValidationError } = require('../utils/customError');

messageCtrl.get = (req, res) => {
    Message.find({}).then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取成功'});
        }
    })
}

messageCtrl.update = ({body}, res) => {
    Message.update({_id: body._id}, {isRead: body.isRead}, {multi: true}).then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '消息更新成功'});
        }
    })
    .catch(err => {
        handleSuccess({res, err, message: '消息更新成功', code: 400});
    })
}

// export
module.exports = messageCtrl
