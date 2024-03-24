import express from 'express';
import * as userController from '../controller/user/index'
import * as messageController from '../controller/message/index'

const router = express.Router();

router.post('/user', userController.create);

router.post('/message', messageController.create)

export default router;
