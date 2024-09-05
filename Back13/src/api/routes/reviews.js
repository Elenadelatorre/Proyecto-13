const {
  getReviews,
  getReviewById,
  postReview,
  deleteReview,
  updateReview,
  getReviewsByPropietario
} = require('../controllers/reviews');
const reviewsRouter = require('express').Router();

reviewsRouter.get('/:propietarioId/reviews', getReviewsByPropietario);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.get('/', getReviews);
reviewsRouter.post('/', postReview);
reviewsRouter.put('/:id', updateReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
