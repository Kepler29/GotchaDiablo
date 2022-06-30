const { Schema, model } = require('mongoose');

const ImageSchema =  Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    image: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    delete: {
        type: Boolean,
        default: false
    }
});

ImageSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Image',  ImageSchema);