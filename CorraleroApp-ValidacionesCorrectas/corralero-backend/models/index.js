// models/index.js
const sequelize = require('../db');

const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Entrega = require('./Entrega');
const DetalleEntrega = require('./DetalleEntrega');

// 1. IMPORTAR TUS NUEVOS MODELOS
const PlanHorario = require('./PlanHorario');
const Empleado = require('./Empleado');
const Marcaje = require('./Marcaje');

// 2. RELACIONES EXISTENTES
Entrega.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
DetalleEntrega.belongsTo(Entrega, { foreignKey: 'id_entrega', as: 'entrega' });

// 3. RELACIONES NUEVAS (Reloj Controlador)

// Empleado -> PlanHorario (FK plan_id en Empleado)
Empleado.belongsTo(PlanHorario, { foreignKey: 'plan_id', as: 'planHorario' });
PlanHorario.hasMany(Empleado, { foreignKey: 'plan_id', as: 'empleados' });

// Marcaje -> Empleado (FK empleado_id en Marcaje)
Marcaje.belongsTo(Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
Empleado.hasMany(Marcaje, { foreignKey: 'empleado_id', as: 'marcajes' });

// 4. EXPORTAR TODO
module.exports = {
  sequelize,
  Usuario,
  Producto,
  Entrega,
  DetalleEntrega,
  // Exporta tus nuevos modelos también
  PlanHorario,
  Empleado,
  Marcaje,
};
