const Moto = require('../models/motos');

// Obtener todas las motos:
const getMotos = async (req, res, next) => {
  try {
    // Obtener todas las motos junto con sus reseñas y propietarios
    const motos = await Moto.find()
      .populate('propietario', 'nombre email')
      .populate('reviews', 'calificacion');

    // Calcular la media de calificaciones y el número total de reseñas para cada moto
    const motosConCalificaciones = motos.map(moto => {
      const totalCalificaciones = moto.reviews.reduce((acc, review) => acc + review.calificacion, 0);
      const promedioCalificaciones = moto.reviews.length > 0 ? (totalCalificaciones / moto.reviews.length).toFixed(1) : 0;
      const totalReseñas = moto.reviews.length;
      
      return {
        ...moto.toObject(),
        averageRating: parseFloat(promedioCalificaciones),
        reviewCount: totalReseñas
      };
    });

    res.status(200).json(motosConCalificaciones);
  } catch (error) {
    return res.status(400).json('Error en la solicitud: ' + error.message);
  }
};


//Obtener una moto:
const getMotoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const moto = await Moto.findById(id)
      .populate('propietario', 'nombre email')
      .populate('reviews', 'comentario calificacion');
    return res.status(200).json(moto);
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};

// POST moto
const postMoto = async (req, res, next) => {
  try {
    const newMoto = new Moto(req.body);
    const motoSaved = await newMoto.save();
    return res.status(200).json(motoSaved);
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};
// Obtener todas las marcas de motos
const getMotosBrands = async (req, res, next) => {
  try {
    const motos = await Moto.distinct('marca'); // Obtener marcas únicas
    res.status(200).json(motos);
  } catch (error) {
    return res.status(400).json({ error: 'Error en la solicitud: ' + error.message });
  }
};



//PUT moto:
const updateMoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldMoto = await Moto.findById(id).populate('propietario', 'nombre email');
    if (!oldMoto) {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }
    if (req.body.estado) {
      oldMoto.estado = req.body.estado;
    }
    await oldMoto.save();

    return res.status(200).json(oldMoto);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar moto', error });
  }
};


// DELETE una moto
const deleteMoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const motoDeleted = await Moto.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: 'Elemento eliminado', elemento: motoDeleted });
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};
module.exports = { getMotos, getMotoById, getMotosBrands, postMoto, updateMoto, deleteMoto };
