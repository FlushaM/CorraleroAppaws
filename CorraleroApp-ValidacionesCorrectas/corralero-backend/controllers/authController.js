const { Usuario } = require('../models'); // Importa el modelo de Usuario
const jwt = require('jsonwebtoken');

// Controlador para iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Datos recibidos:', { email, password });

    if (!email || !password) {
        console.log('Email o contraseña faltantes');
        return res.status(400).json({ error: 'Por favor, ingrese email y contraseña' });
    }

    try {
        // Buscar usuario por email
        const user = await Usuario.findOne({ where: { email } });
        console.log('Usuario encontrado:', user);

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        // Validar contraseña
        console.log('Comparando contraseñas...');
        if (user.password !== password) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Crear token JWT
        console.log('Generando token...');
        const token = jwt.sign(
            { id: user.id_usuario, rol: user.rol, supermercado: user.supermercado },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Inicio de sesión exitoso');
        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id_usuario,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                supermercado: user.supermercado,
            },
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { login };
