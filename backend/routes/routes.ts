import express from 'express';

const router = express.Router();

router.get('/', (req, res) => console.log('root'));

export default router;
