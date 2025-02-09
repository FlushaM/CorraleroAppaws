require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importar conexión y modelos
const productosRoutes = require('./routes/productos');
const entregasRoutes = require('./routes/entregas');
const marcajesRoutes = require('./routes/marcajes');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middlewares/authMiddleware');

const app = express();

// Middleware global
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://corralerointranet.cl',
      'http://localhost:4000',
      'https://corralero-backed.vercel.app',
      /\.vercel\.app$/ // Permite subdominios de Vercel
    ];
    if (!origin || allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por política de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
app.use('/api/marcajes', verifyToken, marcajesRoutes);

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
