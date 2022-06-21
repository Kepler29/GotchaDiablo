const {v4: uuidv4} = require("uuid");
const path = require("path");

const fileUpload = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length -1];
        // Validar extension
        if (!validExtensions.includes(extension)){
            return reject(`La extensión ${extension} no es valida, extensiones validas ${validExtensions}`);
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname , '../uploads/', directory, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    });
}

module.exports = {
    fileUpload
}
