const Moto = require('../models/motos');

// Obtener todas las motos:
const getMotos = async (req, res, next) => {
  try {
    const motos = await Moto.find();
    res.status(200).json(motos);
  } catch (error) {
    return res.status(400).json('Error en la solicitud' + error.message);
  }
};

//Obtener una moto:
const getMotoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const moto = await Moto.findById(id);
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
module.exports = { getMotos, getMotoById, postMoto, deleteMoto };
