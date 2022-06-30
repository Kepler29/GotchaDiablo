const { request, response } = require('express');
const { Package } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");

const packagesGetPublic = async (req, res = response) => {

    const [ totalPackages, packages] = await Promise.all([
        Package.countDocuments({delete:false, active:true}),
        Package.find({delete:false, active:true})
    ]);

    res.json({
        totalPackages,
        packages,
    });
};

const packageGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const package = await Package.findOne({slug});
    res.status(200).json({
        package
    });
}

const packagesGet = async (req, res = response) => {

    const [ total, packages ] = await Promise.all([
        Package.countDocuments({delete:false}),
        Package.find({delete:false})
    ]);

    res.json({
        total,
        packages
    });
};

const packagePost = async (req = request, res = response) => {

    let { name, price, description, intro, type } = req.body;
    const slug = urlSlug(name);
    const existPackage = await Package.findOne({slug});
    if (existPackage){
        return res.status(400).json({
            msg: `El slug ${slug} no se puede repetir cambiar el nombre del paquete`
        })
    }
    let image;
    if(req.files){
        image = await fileUploadHelper(req.files, undefined, 'packages');
    }
    const package = new Package({name, slug, price, description, intro, image});



    // Guardar en Base de datos
    await package.save();

    res.json({
        package
    })
}

const packageActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [package] = await Promise.all([
        Package.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        package,
        authenticatedUser
    });
}

const packageShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const package = await Package.findById(id);
    res.status(200).json({
        package
    });
}

const packagePut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, price, description, intro } = req.body;
    let slug = urlSlug(name);
    const pack = await Package.findOne({slug});
    if (pack){
        if (pack._id != id){
            res.status(400).json({
                msg: 'No se puede ocupar ese nombre'
            });
        }
    }
    let image;
    let package;
    if(req.files){
        image = await fileUploadHelper(req.files, undefined, 'packages');
        package = await Package.findByIdAndUpdate(id, {name, slug, price, description, intro, image}, {new: true});
    } else {
        package = await Package.findByIdAndUpdate(id, {name, slug, price, description, intro}, {new: true});
    }

    res.status(201).json({
        package
    });
}

const packageDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [package] = await Promise.all([
        Package.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        package,
    });
}

module.exports = {
    packagesGetPublic,
    packageGetPublic,
    packagesGet,
    packagePost,
    packageActive,
    packageShow,
    packagePut,
    packageDelete
}
