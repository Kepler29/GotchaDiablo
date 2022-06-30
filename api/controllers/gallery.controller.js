const { request, response } = require('express');
const { Image } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");

const galleryGetPublic = async (req, res = response) => {

    const [ totalImages, images] = await Promise.all([
        Image.countDocuments({delete:false}),
        Image.find({delete:false})
    ]);

    res.json({
        totalImages,
        images,
    });
};

const galleryGet = async (req, res = response) => {

    const [ total, images ] = await Promise.all([
        Image.countDocuments({delete:false}),
        Image.find({delete:false})
    ]);

    res.json({
        total,
        images
    });
};

const imagePost = async (req = request, res = response) => {

    let { name } = req.body;
    let slug = '';
    if (name){
        slug = urlSlug(name);
        const existImage = await Image.findOne({slug});
        if (existImage){
            return res.status(400).json({
                msg: `El slug ${slug} no se puede repetir cambiar el nombre de la imagen`
            })
        }
    }
    let file;
    if(req.files){
        file = await fileUploadHelper(req.files, undefined, 'gallery');
    }
    let image;
    if (name) {
        image = new Image({name, slug, image: file});
    } else {
        image = new Image({image: file});
    }



    // Guardar en Base de datos
    await image.save();

    res.json({
        image
    })
}

const imageActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [image] = await Promise.all([
        Image.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        image,
        authenticatedUser
    });
}

const imageShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const image = await Image.findById(id);
    res.status(200).json({
        image
    });
}

const imagePut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name } = req.body;
    let slug = '';
    if (name){
        slug = urlSlug(name);
        const existImage = await Image.findOne({slug});
        if (existImage && existImage._id != id){
            return res.status(400).json({
                msg: `El slug ${slug} no se puede repetir cambiar el nombre de la imagen`
            })
        }
    }
    let file;
    if(req.files) {
        file = await fileUploadHelper(req.files, undefined, 'gallery');
    }
    const image = await Image.findByIdAndUpdate(id, {name, slug, image:file}, {new: true});
    res.status(201).json({
        image
    });
}

const imageDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [image] = await Promise.all([
        Image.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        image,
        authenticatedUser
    });
}

module.exports = {
    galleryGetPublic,
    galleryGet,
    imagePost,
    imageActive,
    imageShow,
    imagePut,
    imageDelete
}
