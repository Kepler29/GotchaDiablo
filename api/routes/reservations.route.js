const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existReservationForId, existReservationForSlug } = require("../helpers/db-validators");
const { reservationsGet, reservationsGetUser, reservationGetPublic, reservationsGetPublic, reservationPost, reservationPut, reservationShow, reservationActive, reservationDelete } = require("../controllers/reservations.controller");

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], reservationsGet);

router.get('/:user', [
    validateJWT,
    validateFields
], reservationsGetUser);

router.get('/public', [
    validateJWT
], reservationsGetPublic);

router.get('/public/:slug', [
    validateJWT,
    validateFields
], reservationGetPublic);

router.post('/', [
    validateJWT,
    validateFields
], reservationPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existReservationForId),
    validateFields
], reservationPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existReservationForId),
    validateFields
], reservationShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    check('id').custom(existReservationForId),
    validateFields
], reservationActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existReservationForId),
    validateFields
], reservationDelete);

module.exports = router;
