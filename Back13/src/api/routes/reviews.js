const {
  getReviews,
  getReviewById,
  postReview,
  deleteReview,
  updateReview,
  getReviewsByUsuario,
  getReviewsByPropietario
} = require('../controllers/reviews');
const reviewsRouter = require('express').Router();

reviewsRouter.get(
  '/:propietarioId/reviews-propietario',
  getReviewsByPropietario
);
reviewsRouter.get('/:userId/reviews-user', getReviewsByUsuario);
reviewsRouter.get('/:id', getReviewById);
reviewsRouter.get('/', getReviews);
reviewsRouter.post('/', postReview);
reviewsRouter.put('/:id', updateReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
