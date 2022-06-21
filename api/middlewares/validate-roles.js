const { request, response } = require("express");


const adminRole = async (req = request, res = response, next) => {
    const { role, name } = req.user;
    if(!req.user){
        return res.status(500).json({
            msg: 'No se puede validar el usuario sin validar el token'
        });
    }
    if(role != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El Usuario ${name} no tiene permiso para eliminar usuarios`
        });
    }
    next();
};

const hasRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        const { role, name } = req.user;
        if(!req.user){
            return res.status(500).json({
                msg: 'No se puede validar el usuario sin validar el token'
            });
        }
        if(!roles.includes(role)){
            return res.status(401).json({
                msg: `El usuario ${name} no tiene permiso para ingresar a esta pagina`
            });
        }
        next();
    };
};

module.exports = {
    adminRole,
    hasRole
}
