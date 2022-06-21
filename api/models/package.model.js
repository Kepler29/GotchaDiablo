const { Schema, model } = require('mongoose');

const PackageSchema =  Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'El slug es obligatorio']
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    intro: {
        type: String,
    },
    type: {
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

PackageSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Package',  PackageSchema);