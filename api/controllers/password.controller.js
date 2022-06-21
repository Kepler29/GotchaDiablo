const { request, response } = require('express');
const { User, Company, Group, ResetPassword} = require('../models');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require("../helpers");


const userGet = async (req, res = response) => {

    const [ total, users ] = await Promise.all([
        User.countDocuments({active:true}),
        User.find({active:true})
    ]);

    res.json({
        total,
        users
    });
};

const getUser = async (req, res = response) => {

    const id = req.params.id;

    const [ user ] = await Promise.all([
        User.findById(id),
    ]);

    res.json({
        user
    });
};

const passwordPost = async (req = request, res = response) => {

    let { id, password } = req.body;
    const user = await User.findById(id);

    // Encriptar contraseñana
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    user.forcePass = false;

    // Guardar en Base de datos
    await user.save();

    res.json({
        user
    })
}

const passwordTokenPost = async (req = request, res = response) => {

    let { id, password, token } = req.body;
    const user = await User.findById(id);
    const tokenDB = await ResetPassword.findOne({token});

    await ResetPassword.findByIdAndUpdate(tokenDB._id, {active:false, delete:true}, {new: true});

    // Encriptar contraseñana
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    user.forcePass = false;

    // Guardar en Base de datos
    await user.save();

    res.json({
        user
    })
}

const findTokenPost = async (req = request, res = response) => {

    let { token } = req.body;

    const tokenDB = await ResetPassword.findOne({token, active:true, delete:false});

    if (!tokenDB){
        return res.status(400).json({
            msg: `EL token ya no es valido`
        })
    }

    const userId = tokenDB.user;

    const user = await User.findById(userId);

    // Generar JWT
    const webToken = await generateJWT(user._id);

    res.json({
        user,
        webToken
    });
}

const userPut = async ( req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, role, ...rest } = req.body;

    //  validar Contra base de datos
    if(password){
        // Encriptar contraseñana
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, {new: true});
    res.status(201).json({
        user
    });
}

const userDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [user] = await Promise.all([
        User.findByIdAndUpdate(id,{active:false}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        user,
        authenticatedUser
    })
}

module.exports = {
    userGet,
    passwordPost,
    userPut,
    userDelete,
    getUser,
    findTokenPost,
    passwordTokenPost
}
