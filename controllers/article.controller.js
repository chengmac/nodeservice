/*
 * @Author: chengmac
 * @Date: 2018-10-26 23:31:58
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-05-11 22:41:33
 */

const { handleError, handleSuccess } = require('../utils/handle');
const Article = require('../models/article.model');
const ArticleService = require('../services/article.service');
const VisitorService = require('../services/visitor.service');
const { body, query ,validationResult } = require('express-validator');
const Logger = require('../utils/logger');
const { ApiValidationError } = require('../utils/customError');

class articleCtrl {
    // 保存文章
    async save(req, res, next) {
        Logger.info('articleController.save::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new CustomError(errors);
            }
            const result = await ArticleService.save(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.save::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    // 获取单个文章
    async getArticleById(req, res, next) {
        Logger.info('articleController.getArticleById::', JSON.stringify(req.query));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.getArticleById(req.query);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.getArticleById::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async getAllArticle(req, res, next) {
        Logger.info('articleController.getAllArticle::', JSON.stringify(req.query));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            const result = await ArticleService.getAllArticle(req.query);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.getAllArticle::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }
    // 获取所有已发布文章
    async getPublishArticle(req, res, next) {
        Logger.info('articleController.getPublishArticle::', JSON.stringify(req.query));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            await VisitorService.getVisitorIp(req);
            const result = await ArticleService.getPublishArticle(req.query);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.getPublishArticle::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async deleteArticle(req, res, next) {
        Logger.info('articleController.deleteArticle::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.deleteArticle(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.deleteArticle::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
        Article.deleteMany({_id: {$in: body._id}}).then(docs => {
            if(docs) {
                handleSuccess({ res, result: docs, message: '删除成功' });
            }
        })
        .catch(err => {
            handleError({res, err, message: '删除失败', code: 400});
        });
    }

    async createCategory(req, res, next) {
        Logger.info('articleController.createCategory::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.createCategory(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.createCategory::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async categoryList(req, res, next) {
        Logger.info('articleController.categoryList::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.categoryList(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.categoryList::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async createLabel(req, res, next) {
        Logger.info('articleController.createLabel::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.createLabel(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.createLabel::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async labelList(req, res, next) {
        Logger.info('articleController.labelList::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.labelList(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.labelList::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async deleteLabel(req, res, next) {
        Logger.info('articleController.deleteLabel::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.deleteLabel(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.deleteLabel::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async updateArticleStatus(req, res, next) {
        Logger.info('articleController.updateArticleStatus::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array());
            }
            const result = await ArticleService.updateArticleStatus(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.updateArticleStatus::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async updateArticle(req, res, next) {
        Logger.info('articleController.updateArticle::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            const result = await ArticleService.updateArticle(req.body);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.updateArticle::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }
    async search(req, res, next) {
        Logger.info('articleController.search::', JSON.stringify(req.query));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            const result = await ArticleService.search(req.query);
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.search::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    // 验证req
    validate(method) {
        switch(method) {
            case 'save': return [
                body('title', 'title不能为空').notEmpty(),
                body('subtitle', 'subtitle不能为空').notEmpty(),
                body('category', 'category不能为空').notEmpty(),
                body('label', 'label不能为空').notEmpty(),
                body('type', 'type不能为空').notEmpty(),
                body('content', 'content不能为空').notEmpty(),
                body('private', 'private不能为空').notEmpty(),
                body('heroImage', 'heroImage不能为空').notEmpty(),
                body('status', 'status不能为空').notEmpty(),
            ];
            case 'getAllArticle': return [
                query('page', 'page不能为空').notEmpty(),
                query('pageSize', 'pageSize不能为空').notEmpty(),
                query('status', 'status不能为空').notEmpty(),
            ];
            case 'createCategory': return [
                body('name', 'name必须为string').isString(),
                body('submenu', 'submenu必须为布尔').isBoolean()
            ];
            case 'createLabel': return [
                body('name', 'name必须为string').isString()
            ];
            case 'categoryList': return [];
            case 'labelList': return [];
            case 'deleteLabel': return [body('id', 'id不能为空').isEmpty()];
            case 'deleteArticle': return [body('id', 'id不能为空').isEmpty()];
            case 'updateArticleStatus': return [body('status', 'status不能为空').notEmpty()];
            case 'getArticleById': return [query('articleId', 'articleId不能为空').notEmpty()];
            case 'updateArticle': return [];
            case 'search': return [];
            case 'getPublishArticle': return [];
        }
    }
}


// 批量删除文章

module.exports = new articleCtrl();
