const {
  getReservas,
  getReservaById,
  postReserva,
  deleteReserva,
  updateReserva,
  getReservasByPropietario,
  getReservasByUsuario
} = require('../controllers/reservas');
const reservasRouter = require('express').Router();

reservasRouter.get('/:userId/reservas-user', getReservasByUsuario);
reservasRouter.get('/:propietario/reservas', getReservasByPropietario);
reservasRouter.get('/:id', getReservaById);
reservasRouter.get('/', getReservas);
reservasRouter.post('/', postReserva);
reservasRouter.put('/:id', updateReserva);
reservasRouter.delete('/:id', deleteReserva);

module.exports = reservasRouter;
