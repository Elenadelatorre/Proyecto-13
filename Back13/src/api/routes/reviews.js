const {
  getReviews,
  getReviewById,
  postReview,
  deleteReview,
  updateReview
} = require('../controllers/reviews');
const reviewsRouter = require('express').Router();

reviewsRouter.get('/:id', getReviewById);
reviewsRouter.get('/', getReviews);
reviewsRouter.post('/', postReview);
reviewsRouter.put('/:id', updateReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
