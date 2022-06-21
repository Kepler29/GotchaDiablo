const {request, response} = require("express");
const { fileUpload: fileUploadHelper } = require("../helpers");
const { User, Company, Package} = require('../models');
const path = require("path");
const fs = require("fs");


const fileUpload = async (req = request, res = response) => {

    try{
        // const name = await fileUploadHelper(req.files, ['txt', 'md'], 'textos');
        const name = await fileUploadHelper(req.files, undefined, 'companies');
        res.json({
            name
        });
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }
}

const fileUploadGallery = async (req = request, res = response) => {
    const { id, collection } = req.params;
    try{
        let model;
        const name = await fileUploadHelper(req.files, undefined, collection);
        switch (collection) {
            case 'companies':
                model = await Company.findById(id);
                break;
            case 'packages':
                model = await Package.findById(id);
                break;
        }
        const images = model.images;
        images.push(name);
        model.images = images;
        await model.save();
        res.json({
            model
        });
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }
}

const updatedFile = async (req= request, res=response) =>{
    const { id, collection } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'companies':
            model = await Company.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una noticia con el id ${id}`
                });
            }
            break;
        case 'packages':
            model = await Package.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una categoria con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido Validar esto'});
    }

    // Limpiar imagenes previas
    try{
        if(model.image){
            // Borrar imagen servidor
            const pathImage = path.join(__dirname, '../uploads/', collection, model.image);
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
            }
        }
    } catch (e) {

    }


    const name = await fileUploadHelper(req.files, undefined, collection);
    model.image = name;
    await model.save();

    res.json({
        model
    });

}

const imageShow = async (req= request, res= response) => {
    const { collection, id } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'companies':
            model = await Company.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una compañia con el id ${id}`
                });
            }
            break;
        case 'packages':
            model = await Package.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una categoria con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido Validar esto'});
    }

    try{
        if(model.image){
            const pathImage = path.join(__dirname, '../uploads/', collection, model.image);
            if(fs.existsSync(pathImage)){
                return res.sendFile(pathImage);
            }
        }
    } catch (e) {

    }
    const pathPlaceholder = path.join(__dirname, '../assets/images/no-image.jpg');
    res.sendFile(pathPlaceholder);
}

const imageShowGallery = async (req= request, res= response) => {
    const { collection, id, img } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'companies':
            model = await Company.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una noticia con el id ${id}`
                });
            }
            break;
        case 'packages':
            model = await Package.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una categoria con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido Validar esto'});
    }

    try{
        if(model.images.length > 0){
            const pathImage = path.join(__dirname, '../uploads/', collection, img);
            if(fs.existsSync(pathImage)){
                return res.sendFile(pathImage);
            }
        }
    } catch (e) {

    }
    const pathPlaceholder = path.join(__dirname, '../assets/images/no-image.jpg');
    res.sendFile(pathPlaceholder);
}

const deletedFile = async (req= request, res=response) =>{
    const { id, collection, img } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'companies':
            model = await Company.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una noticia con el id ${id}`
                });
            }
            break;
        case 'packages':
            model = await Package.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una caetgoria con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'No esta la coleccion'});
    }

    // Limpiar imagenes previas
    try{
        if(model.image){
            // Borrar imagen servidor
            const pathImage = path.join(__dirname, '../uploads/', collection, img);
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
            }
        }
    } catch (e) {
        res.status(400).json({
            msg: 'Error al eliminar la imagen',
            e
        });
    }

    model.image = '';
    await model.save();

    res.json({
        model
    });

}

const deletedImageGallery = async (req= request, res=response) =>{
    const { id, collection, img } = req.params;
    let model;
    switch (collection){
        case 'users':
            model = await User.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'companies':
            model = await Company.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una noticia con el id ${id}`
                });
            }
            break;
        case 'packages':
            model = await Package.findById(id);
            if (!model){
                return  res.status(400).json({
                    msg: `No existe una caetgoria con el id ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'No esta la coleccion'});
    }

    // Limpiar imagenes previas
    try{
        if(model.images.length > 0){
            // Borrar imagen servidor
            const pathImage = path.join(__dirname, '../uploads/', collection, img);
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
            }

        }
    } catch (e) {

    }
    const images = model.images;
    const index = images.findIndex(item => item == img);
    images.splice(index, 1);
    model.images = images;
    await model.save();

    res.json({
        model
    });

}

module.exports = {
    fileUpload,
    updatedFile,
    fileUploadGallery,
    imageShowGallery,
    deletedFile,
    deletedImageGallery,
    imageShow
}
