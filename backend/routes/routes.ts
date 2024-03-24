import express from 'express';
import * as userController from '../controller/user/index'

const router = express.Router();

router.post('/user', userController.create);

export default router;
