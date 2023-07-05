import { Router } from 'express';
import { createNewComment, deleteComment, getAllComments, updateComment } from '../controllers/comments.controller';

// const middleware = require('../middleware');

const commentsRouter: Router = Router();
const middleware = require('../middleware');

commentsRouter.get('/', getAllComments);
commentsRouter.post('/', createNewComment);
commentsRouter.delete('/', deleteComment);
commentsRouter.put('/', updateComment);

export default commentsRouter;
