const fileValidate = require("./file-validate");
const validateFields  = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");

module.exports = {
    ...fileValidate,
    ...validateFields,
    ...validateJWT,
}
