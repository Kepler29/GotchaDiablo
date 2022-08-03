const { Promotion, Reservation, Package, User } = require("../models");

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail){
        throw new Error(`El correo ${email} ya esta registrado en la base de datos`);
    }
}

const existEmailUpdate = async (email = '', id = '') => {
    const existEmail = await User.findOne({email});
    let uid = id.req.body.id;
    if (existEmail){
        if (existEmail._id != uid){
            throw new Error(`El correo ${email} ya esta registrado en la base da datos Actualizado  con el id ${uid}`);
        }
    }
}

const existUserForId = async (id) => {
    const existUser = await User.findById(id);

    if (!existUser){
        throw new Error(`El id ${id} no representa a un usuario  en la base da datos`);
    }
}

const allowedCollections = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if(!included){
        throw new Error(`La collección  ${collection} no esta permita, colecciones validas ${collections} `)
    }
    return true;
}

const existCompanyForSlug = async (slug) => {
    const existCompany = await Company.findOne({slug});
    if (!existCompany){
        throw new Error(`El slug ${slug} no representa a una compañia  en la base da datos`);
    }
}

const existCompanyForId = async (id) => {
    const existCompany = await Company.findById(id);
    if (!existCompany){
        throw new Error(`El id ${id} no representa a una compañia  en la base da datos`);
    }
}

const existPackageForSlug = async (slug) => {
    const existPackage = await Package.findOne({slug});
    if (!existPackage){
        throw new Error(`El slug ${slug} no representa a un paquete  en la base da datos`);
    }
}

const existPackageForId = async (id) => {
    const existPackage = await Package.findById(id);
    if (!existPackage){
        throw new Error(`El id ${id} no representa a un paquete  en la base da datos`);
    }
}

const existPromotionForSlug = async (slug) => {
    const existPromotion = await Promotion.findOne({slug});
    if (!existPromotion){
        throw new Error(`El slug ${slug} no representa a una promoción  en la base da datos`);
    }
}

const existPromotionForId = async (id) => {
    const existPromotion = await Promotion.findById(id);
    if (!existPromotion){
        throw new Error(`El id ${id} no representa a una promoción  en la base da datos`);
    }
}

const existReservationForSlug = async (slug) => {
    const existReservation = await Reservation.findOne({slug});
    if (!existReservation){
        throw new Error(`El slug ${slug} no representa a una reservación  en la base da datos`);
    }
}

const existReservationForId = async (id) => {
    const existReservation = await Reservation.findById(id);
    if (!existReservation){
        throw new Error(`El id ${id} no representa a una reservación  en la base da datos`);
    }
}


module.exports = {
    existEmail,
    existEmailUpdate,
    existUserForId,
    allowedCollections,
    existCompanyForSlug,
    existCompanyForId,
    existPackageForSlug,
    existPackageForId,
    existPromotionForSlug,
    existPromotionForId,
    existReservationForSlug,
    existReservationForId
}
