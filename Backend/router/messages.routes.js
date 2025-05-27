import express from 'express';
import { sendMessage ,getMessage} from '../controllers/message.controller.js';
import  isAuthenticated  from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/:id',isAuthenticated,getMessage)
router.post('/send/:id',isAuthenticated,sendMessage)




export default router;
