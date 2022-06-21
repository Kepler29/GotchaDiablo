const { Router} = require('express');
const { userGet, userDelete, userPut, passwordPost, getUser, findTokenPost, passwordTokenPost } = require('../controllers/password.controller');
const { findUserPost } = require('../controllers/emails.controller');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares')
const { existUserForId } = require("../helpers/db-validators");

const router = Router();

router.get('/', userGet);

router.post('/', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    validateFields
], passwordPost);

router.post('/token', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    validateFields
], passwordTokenPost);

router.post('/find/user', [
    check('email', 'El email es obligatorio'),
    check('url', 'La url es obligatorio'),
    validateFields
], findUserPost);

router.post('/find/token', [
    check('token', 'El token es obligatorio'),
    validateFields
], findTokenPost);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], getUser);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userPut);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userDelete);

module.exports = router;
