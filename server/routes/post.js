import express from 'express';
import postController from '../controllers/postController.js';
import validate from '../middleware/validate.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// get all product
router.get('/', postController.getAllPosts);
// create a product
router.post('/create', validate('post'), auth.verifyToken, postController.createPost);
// update a product
router.put('/:slug', validate('post'), auth.verifyTokenAndUserAuthorization, postController.updatePost);
// soft-delete a product
router.delete('/:id', auth.verifyTokenAndUserAuthorization, postController.destroyPost);
// restore a product
router.patch('/:id/restore', auth.verifyTokenAndUserAuthorization, postController.restorePost);
// force-delete a product
router.delete('/:id/force', auth.verifyTokenAndUserAuthorization, postController.forceDestroyPost);

export default router;