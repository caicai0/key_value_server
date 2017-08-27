
const router = require('koa-router')();

var api = require('./api/api');
router.post('/save',api.save);
router.post('/get',api.get);

module.exports = router;