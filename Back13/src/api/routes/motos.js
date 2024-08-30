const {
  getMotos,
  getMotoById,
  postMoto,
  deleteMoto,
  updateMoto
} = require('../controllers/motos');
const motosRouter = require('express').Router();

motosRouter.get('/:id', getMotoById);
motosRouter.get('/', getMotos);
motosRouter.post('/', postMoto);
motosRouter.put('/:id', updateMoto);
motosRouter.delete('/:id', deleteMoto);

module.exports = motosRouter;
