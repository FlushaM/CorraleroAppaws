const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PlanHorario = sequelize.define('PlanHorario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_plan: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  horas_semanales: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
  },
  dias_trabajo: {
    type: DataTypes.STRING, // Compatible con SET de MySQL
    allowNull: true,
  },
}, {
  tableName: 'planes_horario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = PlanHorario;
