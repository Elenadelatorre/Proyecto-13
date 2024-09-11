const Reserva = require('../models/reservas');
const Moto = require('../models/motos');
const User = require('../models/users');

// GET todas las reservas
const getReservas = async (req, res, next) => {
  try {
    const reservas = await Reserva.find()
      .populate('moto', 'VIN marca modelo')
      .populate('usuario', 'nombre email')
      .populate('propietario', 'nombre email');
    res.status(200).json(reservas);
  } catch (error) {
    return res.status(400).json('Error en la solicitud: ' + error.message);
  }
};

// GET una reserva por ID
const getReservaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id)
      .populate('moto', 'VIN marca modelo')
      .populate('usuario', 'nombre email')
      .populate('propietario', 'nombre email');
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    return res.status(200).json(reserva);
  } catch (error) {
    return res.status(400).json('Error en la solicitud: ' + error.message);
  }
};

// GET reservas de las motos de un propietario
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
      .populate('usuario', 'nombre email')
      .populate('propietario', 'nombre email');

    return res.status(200).json(reservas);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error en la solicitud: ' + error.message });
  }
};

// GET reservas de un usuario:
const getReservasByUsuario = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservas = await Reserva.find({ usuario: userId })
      .populate('moto', 'marca modelo imagen')
      .populate('propietario', 'nombre');
    console.log(reservas);
    res.json(reservas);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error obteniendo reservas del usuario', error });
  }
};

// POST una nueva reserva
const postReserva = async (req, res) => {
  try {
    const {
      moto,
      usuario,
      propietario,
      fechaInicio,
      fechaFin,
      precioTotal,
      comentarios
    } = req.body;

    const motoExistente = await Moto.findById(moto);
    if (!motoExistente)
      return res.status(404).json({ message: 'Moto no encontrada' });

    const usuarioExistente = await User.findById(usuario);
    if (!usuarioExistente)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const propietarioExistente = await User.findById(propietario);
    if (!propietarioExistente)
      return res.status(404).json({ message: 'Propietario no encontrado' });

    const nuevaReserva = new Reserva({
      moto,
      usuario,
      propietario,
      fechaInicio,
      fechaFin,
      precioTotal,
      comentarios
    });

    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json(reservaGuardada);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error en la solicitud: ' + error.message });
  }
};

// Actualizar una reserva
const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaExistente = await Reserva.findById(id);
    if (!reservaExistente) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    Object.assign(reservaExistente, req.body);
    await reservaExistente.save();

    res.status(200).json(reservaExistente);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar reserva', error });
  }
};

// Eliminar una reserva
const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaEliminada = await Reserva.findByIdAndDelete(id);
    if (!reservaEliminada) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res
      .status(200)
      .json({ message: 'Reserva eliminada', reserva: reservaEliminada });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error en la solicitud: ' + error.message });
  }
};

module.exports = {
  getReservas,
  getReservaById,
  getReservasByPropietario,
  getReservasByUsuario,
  postReserva,
  updateReserva,
  deleteReserva
};
