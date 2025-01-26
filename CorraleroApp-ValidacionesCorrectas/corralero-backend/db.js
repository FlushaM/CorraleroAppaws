const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); // Importa el módulo mysql2
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Especifica que usarás MySQL
    dialectModule: mysql2, // Incluye el módulo mysql2 explícitamente
    logging: false, // Deshabilita el logging de consultas SQL
    port: process.env.DB_PORT || 3306, // Usa el puerto especificado o el predeterminado
  }
);

// Verificar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
})();

module.exports = sequelize;
