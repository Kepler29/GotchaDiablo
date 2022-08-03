const { request, response } = require('express');
const { Promotion } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");

const promotionsGetPublic = async (req, res = response) => {

    const [ totalPromotions, promotions] = await Promise.all([
        Promotion.countDocuments({delete:false, active:true}),
        Promotion.find({delete:false, active:true})
    ]);

    res.json({
        totalPromotions,
        promotions,
    });
};

const promotionGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const promotion = await Promotion.findOne({slug});
    res.status(200).json({
        promotion
    });
}

const promotionsGet = async (req, res = response) => {

    const [ total, promotions ] = await Promise.all([
        Promotion.countDocuments({delete:false}),
        Promotion.find({delete:false})
    ]);

    res.json({
        total,
        promotions
    });
};

const promotionPost = async (req = request, res = response) => {

    let { name, price, description, intro, dateStart, dateEnd } = req.body;
    const slug = urlSlug(name);
    const existPromotion = await Promotion.findOne({slug});
    if (existPromotion){
        return res.status(400).json({
            msg: `El slug ${slug} no se puede repetir cambiar el nombre de la promocion`
        })
    }
    console.log(req.body);
    let image;
    if(req.files){
        image = await fileUploadHelper(req.files, undefined, 'promotions');
    }
    const promotion = new Promotion({name, slug, price, description, intro, image, dateStart, dateEnd});



    // Guardar en Base de datos
    await promotion.save();

    res.json({
        name
    })
}

const promotionActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [promotion] = await Promise.all([
        Promotion.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        promotion,
        authenticatedUser
    });
}

const promotionShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const promotion = await Promotion.findById(id);
    res.status(200).json({
        promotion
    });
}

const promotionPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, price, description, intro, dateStart, dateEnd } = req.body;
    let slug = urlSlug(name);
    const prom = await Promotion.findOne({slug});
    if (prom){
        if (prom._id != id){
            res.status(400).json({
                msg: 'No se puede ocupar ese nombre'
            });
        }
    }
    let image;
    let promotion;
    if(req.files){
        image = await fileUploadHelper(req.files, undefined, 'promotions');
        promotion = await Promotion.findByIdAndUpdate(id, {name, slug, price, description, intro, image, dateStart, dateEnd}, {new: true});
    } else {
        promotion = await Promotion.findByIdAndUpdate(id, {name, slug, price, description, intro, dateStart, dateEnd}, {new: true});
    }

    res.status(201).json({
        promotion
    });
}

const promotionDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [promotion] = await Promise.all([
        Promotion.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        promotion,
    });
}

module.exports = {
    promotionsGetPublic,
    promotionGetPublic,
    promotionsGet,
    promotionPost,
    promotionActive,
    promotionShow,
    promotionPut,
    promotionDelete
}
