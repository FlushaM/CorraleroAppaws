require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importar conexión y modelos
const productosRoutes = require('./routes/productos');
const entregasRoutes = require('./routes/entregas');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middlewares/authMiddleware');

const app = express();

// Middleware global
app.use(cors({
  origin: ['https://corralerointranet.cl' , "http://localhost:4000" ,"https://corralero-backed.vercel.app"], // Dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
app.use(express.json());

// Sincronizar modelos con la base de datos
(async () => {
  try {
    await sequelize.sync(); // Sincronizar sin alterar datos existentes
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
    process.exit(1);
  }
})();

// Rutas públicas (API)
app.use('/api/auth', authRoutes);

// Rutas protegidas por JWT (API)
app.use('/api/productos', verifyToken, productosRoutes);
app.use('/api/entregas', verifyToken, entregasRoutes);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use('/api/marcajes', marcajesRoutes);
>>>>>>> parent of fd227e4 (update)
=======
>>>>>>> parent of 93741ad (RelojMarcajeV1)
=======
>>>>>>> parent of 93741ad (RelojMarcajeV1)
=======
>>>>>>> parent of 93741ad (RelojMarcajeV1)

// Ruta de prueba para verificar que el backend está funcionando
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});


app.get('/', (req, res) => {
  res.send('Corralero Backend funcionando');
});

app.get('/api/protegida', verifyToken, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


// Exportar la aplicación para Vercel
module.exports = app;
