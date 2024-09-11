const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema(
  {
    moto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'motos',
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    propietario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },

    fechaInicio: {
      type: Date,
      required: true
    },
    fechaFin: {
      type: Date,
      required: true
    },
    precioTotal: {
      type: Number,
      required: true
    },

    // Opcional: Campo para comentarios adicionales
    comentarios: {
      type: String,
      trim: true,
      maxlength: [500, 'El comentario no puede tener más de 500 caracteres']
    }
  },
  { timestamps: true, collection: 'reservas' }
);

const Reserva = mongoose.model('reservas', reservaSchema, 'reservas');

module.exports = Reserva;
