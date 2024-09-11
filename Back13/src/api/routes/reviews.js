const {
  getReviews,
  getReviewById,
  postReview,
  deleteReview,
  updateReview,
  getReviewsByUsuario
} = require('../controllers/reviews');
const reviewsRouter = require('express').Router();

reviewsRouter.get('/:userId/reviews-user', getReviewsByUsuario);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.get('/', getReviews);
reviewsRouter.post('/', postReview);
reviewsRouter.put('/:id', updateReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
