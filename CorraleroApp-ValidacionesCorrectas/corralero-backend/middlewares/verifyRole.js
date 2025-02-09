const verifyRole = (rolesPermitidos) => {
    return (req, res, next) => {
      if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ error: "No tienes permiso para esta acción" });
      }
      next();
    };
  };
  
  module.exports = verifyRole;