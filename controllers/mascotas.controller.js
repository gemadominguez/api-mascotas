const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/data.json');

// leer mascotas
const leerMascotas = () => {
  if (!fs.existsSync(rutaArchivo)) return [];
  const data = fs.readFileSync(rutaArchivo);
  return JSON.parse(data);
};

// escribir mascotas
const guardarMascotas = (mascotas) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(mascotas, null, 2));
};

// obtener(get) mascotas
exports.obtenerMascotas = (req, res) => {
  const mascotas = leerMascotas();
  res.json(mascotas);
};

// obtener (get) mascota por id
exports.obtenerMascotaPorId = (req, res) => {
  const mascotas = leerMascotas();
  const mascota = mascotas.find(m => m.id === parseInt(req.params.id));
  if (!mascota) {
    const error = new Error('Mascota no encontrada');
    error.status = 404;
    throw error;
  }
    res.json(mascota);
};

// crear(post) mascotas
exports.crearMascota = (req, res) => {
    const mascotas = leerMascotas();
    const nuevaMascota = {
      id: Date.now(),
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      raza: req.body.raza || '',
      fechaNacimiento: req.body.fechaNacimiento || '',
      propietario: req.body.propietario || '',
      vacunado: req.body.vacunado || false
    };
    mascotas.push(nuevaMascota);
    guardarMascotas(mascotas);
    res.status(201).json(nuevaMascota);
  };
  
  
// actualizar(put) mascotas
exports.actualizarMascota = (req, res) => {
  const mascotas = leerMascotas();
  const index = mascotas.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    const error = new Error('Mascota no encontrada');
    error.status = 404;
    throw error;
  }
  
  mascotas[index] = { ...mascotas[index], ...req.body };
  guardarMascotas(mascotas);
  res.json(mascotas[index]);
};

// eliminar(delete) mascotas
exports.eliminarMascota = (req, res) => {
  let mascotas = leerMascotas();
  const index = mascotas.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    const error = new Error('Mascota no encontrada');
    error.status = 404;
    throw error;
  }
  
  const eliminada = mascotas.splice(index, 1);
  guardarMascotas(mascotas);
  res.json({ mensaje: 'Mascota eliminada', eliminada });
};
