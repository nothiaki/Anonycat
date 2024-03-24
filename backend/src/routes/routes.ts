import express from 'express';
import * as messageController from '../controller/user/index'

const router = express.Router();

router.get('/user', messageController.getAll)

export default router;
