const {
  getMotos,
  getMotoById,
  postMoto,
  deleteMoto
} = require('../controllers/motos');
const motosRouter = require('express').Router();

motosRouter.get('/:id', getMotoById);
motosRouter.get('/', getMotos);
motosRouter.post('/', postMoto);
motosRouter.delete('/:id', deleteMoto);

module.exports = motosRouter;