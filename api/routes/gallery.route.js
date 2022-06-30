const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { galleryGet, galleryGetPublic, imagePost, imagePut, imageShow, imageActive, imageDelete } = require("../controllers/gallery.controller");

const router = Router();

router.get('/', [
    validateJWT
] , galleryGet);

router.get('/public', [
    validateJWT
] , galleryGetPublic);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], imageShow);

router.post('/', [
    validateJWT,
    validateFields
], imagePost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], imagePut);


router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    validateFields
], imageActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], imageDelete);

module.exports = router;
