const { request, response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: " Usuario / Password no son incorrectos"
            });
        }

        // Verificar si el usuario esta activo
        if(!user.active){
            return res.status(400).json({
                msg: " El usuario no tiene acceso a la plataforma"
            });
        }

        // Verificar si el usuario esta activo
        if(user.delete){
            return res.status(400).json({
                msg: " Usuario / Password no son incorrectos"
            });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: " Usuario / Password no son incorrectos"
            });
        }

        // Generar JWT
        const token = await generateJWT(user._id);

        res.json({
            authToken: token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Se encontro un error, comuniquese con el administrador',
            error: e
        });
    }
};

const me = async (req = request, res = response) => {
    const user  = req.user;

    res.json({
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        role: user.role,
        image: user.image,
        active: user.active,
        delete: user.delete,
    });
};

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, image, email } = await googleVerify(id_token);
        let user = await User.findOne({email});
        if(!user){
            const data = {
                name,
                image,
                email,
                password: ':P',
                google: true
            };
            user = new User(data);
            await user.save();
        }
        if(!user.active){
            return res.status(401).json({
                msg: 'El usuario esta bloqueado, contacte al administrador'
            });
        }
        // Generar JWT
        const token = await generateJWT(user._id);

        res.json({
            user,
            token
        });
    } catch (error){
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }
};

module.exports = {
    login,
    googleSignIn,
    me
};
