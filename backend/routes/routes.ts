import express from 'express';
import * as userController from '../controller/user/index'

const router = express.Router();

router.post('/', userController.create);

export default router;
