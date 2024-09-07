const Reserva = require('../models/reservas');
const Moto = require('../models/motos');
const User = require('../models/users');

// Obtener todas las reservas
const getReservas = async (req, res, next) => {
  try {
    const reservas = await Reserva.find()
      .populate('moto', 'VIN marca modelo')
      .populate('cliente', 'nombre email');
    res.status(200).json(reservas);
  } catch (error) {
    return res.status(400).json('Error en la solicitud: ' + error.message);
  }
};

// Obtener una reserva por ID
const getReservaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id)
      .populate('moto', 'VIN marca modelo')
      .populate('cliente', 'nombre email');
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    return res.status(200).json(reserva);
  } catch (error) {
    return res.status(400).json('Error en la solicitud: ' + error.message);
  }
};

// Obtener reservas de las motos de un propietario
const getReservasByPropietario = async (req, res, next) => {
  try {
    const { propietarioId } = req.params;

    const motos = await Moto.find({ propietario: propietarioId }).select('_id');

    if (!motos || motos.length === 0) {
      return res
        .status(404)
        .json({ message: 'No se encontraron motos para este propietario.' });
    }

    const motoIds = motos.map((moto) => moto._id);

    const reservas = await Reserva.find({ moto: { $in: motoIds } })
      .populate('moto', 'VIN marca modelo')
      .populate('cliente', 'nombre email');

    return res.status(200).json(reservas);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error en la solicitud: ' + error.message });
  }
};

// Crear una nueva reserva
const postReserva = async (req, res) => {
  try {
    const { moto, usuario, fechaInicio, fechaFin, precioTotal, comentarios } =
      req.body;

    // Buscar la moto
    const motoExistente = await Moto.findById(moto);
    if (!motoExistente)
      return res.status(404).json({ message: 'Moto no encontrada' });

    // Buscar el usuario
    const usuarioExistente = await User.findById(usuario); // Usa directamente el ID del usuario
    if (!usuarioExistente)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    // Crear la reserva
    const nuevaReserva = new Reserva({
      moto,
      usuario: usuarioExistente._id, // Usamos el ID del usuario
      fechaInicio,
      fechaFin,
      precioTotal,
      comentarios
    });

    // Guardar la reserva
    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json(reservaGuardada);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error en la solicitud: ' + error.message });
  }
};

// Actualizar una reserva
const updateReserva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservaExistente = await Reserva.findById(id);
    if (!reservaExistente) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    Object.assign(reservaExistente, req.body);
    await reservaExistente.save();

    return res.status(200).json(reservaExistente);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar reserva', error });
  }
};

// Eliminar una reserva
const deleteReserva = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservaEliminada = await Reserva.findByIdAndDelete(id);
    if (!reservaEliminada) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    return res
      .status(200)
      .json({ message: 'Reserva eliminada', reserva: reservaEliminada });
  } catch (error) {
    return res.status(400).json('Error en la solicitud: ' + error.message);
  }
};

module.exports = {
  getReservas,
  getReservaById,
  getReservasByPropietario,
  postReserva,
  updateReserva,
  deleteReserva
};
