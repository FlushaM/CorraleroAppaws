// corralero-backend/models/PlanHorario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PlanHorario = sequelize.define('PlanHorario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_plan: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  horas_semanales: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true
  },
  // Usamos un SET para MySQL. Alternativamente, podrías usar un campo TEXT o JSON.
  dias_trabajo: {
    type: DataTypes.SET('lunes','martes','miercoles','jueves','viernes','sabado','domingo'),
    allowNull: true
  }
}, {
  tableName: 'planes_horario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = PlanHorario;
