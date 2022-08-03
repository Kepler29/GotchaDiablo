const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existPromotionForId, existPromotionForSlug } = require("../helpers/db-validators");
const { promotionsGet, promotionGetPublic, promotionsGetPublic, promotionPost, promotionPut, promotionShow, promotionActive, promotionDelete } = require("../controllers/promotions.controller");

const router = Router();

router.get('/', [
    validateJWT
] , promotionsGet);

router.get('/public', promotionsGetPublic);

router.get('/public/:slug', [
    check('id', 'No es un id valido').isMongoId(),
    check('slug').custom(existPromotionForSlug),
    validateFields
] , promotionGetPublic);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], promotionPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existPromotionForId),
    validateFields
], promotionPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existPromotionForId),
    validateFields
], promotionShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    check('id').custom(existPromotionForId),
    validateFields
], promotionActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existPromotionForId),
    validateFields
], promotionDelete);

module.exports = router;
