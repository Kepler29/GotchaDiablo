const { Router} = require('express');
const { userGet, userDelete, userPut, userActive, userShow, userDesActive, userPost, userRegistration, detailsPost,
    emailPost, passwordPost } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existEmail, existUserForId, existEmailUpdate } = require("../helpers/db-validators");

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
] , userGet);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userShow);

router.get('/active/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userActive);

router.get('/des-active/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userDesActive);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmail),
    validateFields
], userPost);

router.post('/details', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('phone', 'El telefono debe tener 10 numeros').isLength({min:10, max:10}),
    check('country', 'El pais no es valido').not().isEmpty(),
    validateFields
], detailsPost);

router.post('/email', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmailUpdate),
    validateFields
], emailPost);

router.post('/password', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    validateFields
], passwordPost);

router.post('/registration', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmail),
    validateFields
], userRegistration);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmailUpdate),
    validateFields
], userPut);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userDelete);

module.exports = router;
