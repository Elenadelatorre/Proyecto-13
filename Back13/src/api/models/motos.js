const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema(
  {
    VIN: {
      type: String,
      required: [true, 'El VIN es obligatorio'],
      trim: true
    },
    marca: {
      type: String,
      required: [true, 'La marca es obligatoria'],
      trim: true
    },
    modelo: {
      type: String,
      required: [true, 'El modelo es obligatorio'],
      trim: true
    },
    tipo: [
      {
        type: String,
        enum: [
          'Cruiser',
          'Custom',
          'Deportiva',
          'Eléctrica',
          'Motocross',
          'Naked',
          'Retro',
          'Scooter',
          'Trail',
          'Turismo'
        ]
      }
    ],
    año: { type: Number, required: [true, 'El año es obligatorio'] },
    km: {
      type: Number,
      required: [true, 'Los kilómetros son obligatorios']
    },
    precio: { type: Number, required: [true, 'El precio es obligatorio'] },
    estado: { type: String, enum: ['Disponible', 'No disponible'] },
    imagen: {
      type: String,
      required: [true, 'La imagen es obligatoria'],
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
    },
    propietario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true, collection: 'motos' }
);

const Moto = mongoose.model('motos', motoSchema, 'motos');

module.exports = Moto;
