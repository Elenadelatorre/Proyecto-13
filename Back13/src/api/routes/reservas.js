const {
  getReservas,
  getReservaById,
  getReservasBrands,
  postReserva,
  deleteReserva,
  updateReserva,
  getReservasByPropietario
} = require('../controllers/reservas');
const reservasRouter = require('express').Router();

reservasRouter.get('/:propietario/reservas', getReservasByPropietario);
reservasRouter.get('/:id', getReservaById);
reservasRouter.get('/', getReservas);
reservasRouter.post('/', postReserva);
reservasRouter.put('/:id', updateReserva);
reservasRouter.delete('/:id', deleteReserva);

module.exports = reservasRouter;
