const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existCompanyForId, existCompanyForSlug } = require("../helpers/db-validators");
const { companiesGet, companyPost, companyPut, companyShow, companyActive, companyDelete } = require("../controllers/companies.controller");

const router = Router();

router.get('/', [
    validateJWT
] , companiesGet);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], companyPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCompanyForId),
    validateFields
], companyPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCompanyForId),
    validateFields
], companyShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    check('id').custom(existCompanyForId),
    validateFields
], companyActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existCompanyForId),
    validateFields
], companyDelete);

module.exports = router;
