const { Marcaje, Empleado } = require('../models');
const { Op } = require('sequelize');

// Controlador para REGISTRAR/ACTUALIZAR un marcaje
// Se llama cuando el trabajador escanea su código.
const registrarMarcaje = async (req, res) => {
  try {
    // 1. Recibimos el código de barras. Podrías recibir otras cosas si tu front las envía.
    const { codigoBarras } = req.body;
    // En tu "entregasController" sueles leer "req.user.supermercado" o "req.user.id". 
    // Aquí dependerá de si necesitas asociar el marcaje a un 'supermercado' o algo similar.

    if (!codigoBarras) {
      return res.status(400).json({ error: 'Falta el código de barras del empleado.' });
    }

    // 2. Buscar al empleado con ese código de barras
    const empleado = await Empleado.findOne({
      where: { codigo_barras: codigoBarras },
    });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado para ese código.' });
    }

    // 3. Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date(); 
    const fechaHoy = hoy.toISOString().split('T')[0]; // "2025-02-10"

    // 4. Verificar si ya existe un registro de marcaje para "hoy" y ese empleado.
    let marcaje = await Marcaje.findOne({
      where: {
        empleado_id: empleado.id,
        fecha: fechaHoy,
      },
    });

    // 5. Si no existe, lo creamos
    if (!marcaje) {
      marcaje = await Marcaje.create({
        empleado_id: empleado.id,
        fecha: fechaHoy,
        // entrada_manana, salida_manana, etc. quedan nulos de momento
      });
    }

    // 6. Determinar cuál campo actualizar. 
    //    Puedes aplicar la lógica que prefieras. Aquí, un ejemplo secuencial.
    let campoACompletar = null;
    if (!marcaje.entrada_manana) {
      campoACompletar = 'entrada_manana';
    } else if (!marcaje.salida_manana) {
      campoACompletar = 'salida_manana';
    } else if (!marcaje.entrada_tarde) {
      campoACompletar = 'entrada_tarde';
    } else if (!marcaje.salida_tarde) {
      campoACompletar = 'salida_tarde';
    } else {
      // Ya están todos completos, podrías retornar sin actualizar nada más.
      return res.json({
        message: 'Se completaron todas las marcas para el día de hoy.',
        marcaje,
      });
    }

    // 7. Guardar la hora actual en ese campo
    const horaActual = hoy.toTimeString().split(' ')[0]; // "HH:MM:SS"
    marcaje[campoACompletar] = horaActual;

    // Si quieres, aquí calculas total_horas una vez que estén los 4 campos.
    // O en otro endpoint, o con un hook en el modelo.
    /*
    if (marcaje.entrada_manana && marcaje.salida_manana &&
        marcaje.entrada_tarde && marcaje.salida_tarde) {
      marcaje.total_horas = calcularHoras( ... );
    }
    */

    await marcaje.save();

    // Retornar el empleado y el marcaje (así actualizas en front la info)
    return res.status(200).json({
      message: `Marcaje registrado en ${campoACompletar}`,
      empleado,
      marcaje,
    });
  } catch (error) {
    console.error('Error al registrar marcaje:', error);
    return res.status(500).json({ error: 'Error al registrar marcaje' });
  }
};

// Controlador para OBTENER TODOS los marcajes o filtrar
// Similar a "obtenerEntregas". 
const obtenerMarcajes = async (req, res) => {
  try {
    // Si necesitas filtrar por supermercado, rol, fecha o empleado, lo adaptas.
    // Por ejemplo,:
    // const { supermercado, rol } = req.user;
    // let where = rol === 'admin' ? {} : { ... };

    const marcajes = await Marcaje.findAll({
      // where,
      order: [['fecha', 'DESC']],
      // Podrías incluir datos del Empleado si lo deseas:
      include: [{
        model: Empleado,
        as: 'empleado',
        // attributes: ['nombre_completo', 'rut'] // si quieres limitar columnas
      }],
    });

    return res.json(marcajes);
  } catch (error) {
    console.error('Error al obtener marcajes:', error);
    return res.status(500).json({ error: 'Error al obtener marcajes' });
  }
};

// Controlador para OBTENER el detalle de un marcaje específico (similar a "obtenerDetalleEntrega")
// Podrías filtrar por id de marcaje, o por fecha+empleado, etc.
const obtenerMarcaje = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Se requiere el ID del marcaje' });
    }

    const marcaje = await Marcaje.findByPk(id, {
      include: [{
        model: Empleado,
        as: 'empleado',
      }],
    });

    if (!marcaje) {
      return res.status(404).json({ error: 'No se encontró marcaje con ese ID' });
    }

    return res.json(marcaje);
  } catch (error) {
    console.error('Error al obtener marcaje:', error);
    return res.status(500).json({ error: 'Error al obtener marcaje' });
  }
};

// Controlador para ELIMINAR un marcaje (similar a "eliminarEntrega"), si lo permites:
const eliminarMarcaje = async (req, res) => {
  try {
    const { id } = req.params;
    const marcaje = await Marcaje.findByPk(id);
    if (!marcaje) {
      return res.status(404).json({ error: 'Marcaje no encontrado' });
    }

    await marcaje.destroy();
    return res.json({ message: 'Marcaje eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar marcaje:', error);
    return res.status(500).json({ error: 'Error al eliminar marcaje' });
  }
};

// Exportar funciones como en tu "entregasController.js"
module.exports = {
  registrarMarcaje,
  obtenerMarcajes,
  obtenerMarcaje,
  eliminarMarcaje,
};
