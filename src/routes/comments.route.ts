import { Router } from 'express';
import { createNewComment, getAllComments } from '../controllers/comments.controller';

// const middleware = require('../middleware');

const commentsRouter: Router = Router();
const middleware = require('../middleware');

commentsRouter.get('/', getAllComments);
commentsRouter.post('/', createNewComment);

export default commentsRouter;
