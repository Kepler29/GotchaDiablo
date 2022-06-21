const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existPackageForId, existPackageForSlug } = require("../helpers/db-validators");
const { packagesGet, packageGetPublic, packagesGetPublic, packagePost, packagePut, packageShow, packageActive, packageDelete } = require("../controllers/packages.controller");

const router = Router();

router.get('/', [
    validateJWT
] , packagesGet);

router.get('/public', packagesGetPublic);

router.get('/public/:slug', [
    check('id', 'No es un id valido').isMongoId(),
    check('slug').custom(existPackageForSlug),
    validateFields
] , packageGetPublic);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], packagePost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existPackageForId),
    validateFields
], packagePut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existPackageForId),
    validateFields
], packageShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    check('id').custom(existPackageForId),
    validateFields
], packageActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existPackageForId),
    validateFields
], packageDelete);

module.exports = router;
