const { Schema, model } = require('mongoose');

const CompanySchema =  Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'El slug es obligatorio']
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

CompanySchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Company',  CompanySchema);