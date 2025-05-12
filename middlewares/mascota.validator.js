const Joi = require('joi');

const mascotaSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  tipo: Joi.string().required(),
  raza: Joi.string().required(),
  fechaNacimiento: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .message('La fecha debe tener formato YYYY-MM-DD')
    .optional(),
  propietario: Joi.string().optional(),
  vacunado: Joi.boolean().optional()
});

const validarMascota = (req, res, next) => {
  const { error } = mascotaSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      mensaje: 'Datos inválidos',
      errores: error.details.map(det => det.message)
    });
  }

  next(); 
};

module.exports = validarMascota;

