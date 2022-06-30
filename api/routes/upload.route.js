const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, fileValidate } = require("../middlewares");
const { allowedCollections } = require("../helpers");
const { fileUpload, updatedFile, imageShow, fileUploadGallery, imageShowGallery, deletedFile, deletedImageGallery } = require('../controllers/upload.controller');


const router = Router();

router.post('/', [
    fileValidate,
    validateFields
], fileUpload);

router.post('/:collection/:id', [
    fileValidate,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], fileUploadGallery);

router.put('/:collection/:id', [
    fileValidate,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['packages', 'users', 'gallery'])),
    validateFields
], updatedFile);

router.get('/:collection/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['packages', 'users', 'gallery'])),
    validateFields
], imageShow);

router.get('/:collection/:id/:img', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('img', 'El nombre de la imagen es obligatorio').not().isEmpty(),
    check('collection').custom(c => allowedCollections(c, ['packages', 'users', 'gallery'])),
    validateFields
], imageShowGallery);

router.delete('/:collection/:id/:img', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('img', 'El nombre de la imagen es obligatorio').not().isEmpty(),
    check('collection').custom(c => allowedCollections(c, ['packages', 'users', 'gallery'])),
    validateFields
], deletedFile);

router.delete('/gallery/:collection/:id/:img', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('img', 'El nombre de la imagen es obligatorio').not().isEmpty(),
    check('collection').custom(c => allowedCollections(c, ['packages', 'users', 'gallery'])),
    validateFields
], deletedImageGallery);

module.exports = router;
