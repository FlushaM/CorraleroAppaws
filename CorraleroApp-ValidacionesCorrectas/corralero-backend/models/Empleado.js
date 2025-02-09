// corralero-backend/models/Empleado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Empleado = sequelize.define('Empleado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  codigo_barras: {
    type: DataTypes.STRING(50),
    unique: true,       // Para escanear fichajes
    allowNull: true
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rut: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: true     // Ajusta si debe ser NOT NULL
  },
  cargo: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  local: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // plan_id se relacionará vía belongsTo(PlanHorario)
}, {
  tableName: 'empleados',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Empleado;
