const Router = require('express');

const router = new Router();

const userRouter = require('./userRouter');
const eventRouter = require('./eventRouter');

router.use('/', userRouter);
router.use('/event', eventRouter);

module.exports = router;