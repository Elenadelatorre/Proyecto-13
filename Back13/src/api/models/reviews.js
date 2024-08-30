const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    moto: { type: mongoose.Schema.Types.ObjectId, ref: 'motos', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    comentario: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'El comentario no puede tener más de 500 caracteres'],
    },
    calificacion: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true, collection: 'reviews' }
);

const Review = mongoose.model('reviews', reviewSchema, 'reviews');

module.exports = Review;
