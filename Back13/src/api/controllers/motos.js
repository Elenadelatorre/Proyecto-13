const Moto = require('../models/motos');

// Obtener todas las motos:
const getMotos = async (req, res, next) => {
  try {
    const motos = await Moto.find()
      .populate('propietario', 'nombre email')
      .populate('reviews', 'comentario calificacion');
    res.status(200).json(motos);
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
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

//PUT reviews:
const updateMoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldMoto = await Moto.findById(id);
    if (!oldMoto) {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }
    Object.assign(oldMoto, req.body);
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
module.exports = { getMotos, getMotoById, postMoto, updateMoto, deleteMoto };
