const { request, response } = require('express');
const { Company } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");

const companiesGetPublic = async (req, res = response) => {

    const [ totalCompanies, companies] = await Promise.all([
        Company.countDocuments({delete:false}),
        Company.find({delete:false})
    ]);

    res.json({
        totalCompanies,
        companies,
    });
};

const companiesGet = async (req, res = response) => {

    const [ total, companies ] = await Promise.all([
        Company.countDocuments({delete:false}),
        Company.find({delete:false})
    ]);

    res.json({
        total,
        companies
    });
};

const companyPost = async (req = request, res = response) => {

    let { name } = req.body;
    const slug = urlSlug(name);
    const existCompany = await Company.findOne({slug});
    if (existCompany){
        return res.status(400).json({
            msg: `El slug ${slug} no se puede repetir cambiar el nombre de la categoria`
        })
    }
    let image;
    if(req.files){
        image = await fileUploadHelper(req.files, undefined, 'companies');
    }
    const company = new Company({name, slug, image});



    // Guardar en Base de datos
    await company.save();

    res.json({
        company
    })
}

const companyActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [company] = await Promise.all([
        Company.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        company,
        authenticatedUser
    });
}

const companyShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const company = await Company.findById(id);
    res.status(200).json({
        company
    });
}

const companyPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name } = req.body;
    let slug = urlSlug(name);
    let image;
    if(req.files) {
        image = await fileUploadHelper(req.files, undefined, 'companies');
    }
    const company = await Company.findByIdAndUpdate(id, {name, slug, image}, {new: true});
    res.status(201).json({
        company
    });
}

const companyDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [company] = await Promise.all([
        Company.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        company,
        authenticatedUser
    });
}

module.exports = {
    companiesGetPublic,
    companiesGet,
    companyPost,
    companyActive,
    companyShow,
    companyPut,
    companyDelete
}
