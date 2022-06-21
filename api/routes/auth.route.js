const { Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, me } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT}  = require("../middlewares");

const router = Router();

router.get('/me', [
    validateJWT,
    validateFields
], me);

router.post('/login', [
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;
