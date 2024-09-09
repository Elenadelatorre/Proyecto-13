const Review = require('../models/reviews');
const Moto = require('../models/motos');

// Obtener todas las reviews:
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('moto', 'marca modelo')
      .populate('user', 'nombre email');
    res.status(200).json(reviews);
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};

//Obtener una review:
const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id)
      .populate('moto', 'marca modelo')
      .populate('user', 'nombre email');
    return res.status(200).json(review);
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};

// Obtener reseñas de las motos de un propietario:
const getReviewsByPropietario = async (req, res, next) => {
  try {
    const { propietarioId } = req.params;

    const motos = await Moto.find({ propietario: propietarioId }).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'nombre email'
      }
    });

    // Si no se encuentran motos
    if (!motos || motos.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron motos para este propietario.' });
    }

    const reseñas = motos.flatMap((moto) => moto.reviews);

    return res.status(200).json(reseñas);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error en la solicitud: ' + error.message });
  }
};


const getReviewsByUsuario = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ usuario: userId })
      .populate('moto', 'marca modelo')
      .populate('propietario', 'nombre email');
    console.log(reviews);
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error obteniendo reseñas del usuario', error });
  }
};


// POST review
const postReview = async (req, res, next) => {
  try {
    const { user, moto, comentario, calificacion } = req.body;

    const newReview = new Review({
      user,
      moto,
      comentario,
      calificacion
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: 'Error en la solicitud', error });
  }
};

//PUT reviews:
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldReview = await Review.findById(id);
    if (!oldReview) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    Object.assign(oldReview, req.body);
    await oldReview.save();

    return res.status(200).json(oldReview);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar reseña', error });
  }
};

// DELETE una review
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewDeleted = await Review.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: 'Elemento eliminado', elemento: reviewDeleted });
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};
module.exports = {
  getReviews,
  getReviewById,
  getReviewsByPropietario,
  getReviewsByUsuario,
  postReview,
  updateReview,
  deleteReview
};
