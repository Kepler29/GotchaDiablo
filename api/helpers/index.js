const DBValidators  = require("./db-validators");
const GenerateJWT = require("./generate-jwt");
const GoogleVerify = require("./google-verify");
const fileUpload = require("./file-upload");

module.exports = {
    ...DBValidators,
    ...GenerateJWT,
    ...GoogleVerify,
    ...fileUpload
}
