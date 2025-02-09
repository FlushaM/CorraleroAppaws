// corralero-backend/models/Marcaje.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Marcaje = sequelize.define('Marcaje', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  entrada_manana: {
    type: DataTypes.TIME,
    allowNull: true
  },
  salida_manana: {
    type: DataTypes.TIME,
    allowNull: true
  },
  entrada_tarde: {
    type: DataTypes.TIME,
    allowNull: true
  },
  salida_tarde: {
    type: DataTypes.TIME,
    allowNull: true
  },
  total_horas: {
    type: DataTypes.DECIMAL(4,1),
    defaultValue: 0.0
  },
  estado: {
    type: DataTypes.STRING(50),
    defaultValue: 'pendiente' // "ok", "ausente", "incompleto", etc.
  }
}, {
  tableName: 'marcajes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Marcaje;
