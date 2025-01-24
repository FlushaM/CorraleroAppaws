require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const cors = require('cors');
const path = require('path'); // Importar para servir archivos estáticos
const { sequelize } = require('./models'); // Importar conexión y modelos
const productosRoutes = require('./routes/productos');
const entregasRoutes = require('./routes/entregas');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middlewares/authMiddleware');

const app = express();

// Middleware global
app.use(cors({
  origin: ['http://localhost:3000', 'https://corralerointranet.cl'], // Dominios permitidos
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

// Servir archivos del frontend
app.use(express.static(path.join(__dirname, '../public_html')));

// Manejador para rutas desconocidas (sirve el frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});

// Conexión con el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
