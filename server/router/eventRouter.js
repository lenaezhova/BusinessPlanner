const Router = require('express').Router;
const EventController = require('../controllers/event-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/create',authMiddleware, EventController.create);
router.get('/all/:email',authMiddleware, EventController.getAll);
router.post('/update/:email',authMiddleware, EventController.update);
router.delete('/deleteOne/:id',authMiddleware, EventController.deleteOne);

module.exports = router;