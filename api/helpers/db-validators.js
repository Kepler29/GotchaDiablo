const { Company, Package, User } = require("../models");

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail){
        throw new Error(`El correo ${email} ya esta registrado en la base da datos`);
    }
}

const existEmailUpdate = async (email = '', id = '') => {
    const existEmail = await User.findOne({email});
    // const user = await User.findById(id);
    console.log(email + ' El email mandado');
    console.log(id + ' El id mandado');
    console.log(existEmail + ' Usuario encontrado');
    if (existEmail){
        if (existEmail._id != id){
            throw new Error(`El correo ${email} ya esta registrado en la base da datos Actualizado  con el id ${id}`);
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


module.exports = {
    existEmail,
    existEmailUpdate,
    existUserForId,
    allowedCollections,
    existCompanyForSlug,
    existCompanyForId,
    existPackageForSlug,
    existPackageForId
}
