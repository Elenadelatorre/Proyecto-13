const {
  getMotos,
  getMotoById,
  getMotosBrands,
  postMoto,
  deleteMoto,
  updateMoto
} = require('../controllers/motos');
const motosRouter = require('express').Router();

motosRouter.get('/:id', getMotoById);
motosRouter.get('/brands', getMotosBrands);
motosRouter.get('/', getMotos);
motosRouter.post('/', postMoto);
motosRouter.put('/:id', updateMoto);
motosRouter.delete('/:id', deleteMoto);

module.exports = motosRouter;
