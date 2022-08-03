const { Schema, model } = require('mongoose');

const PromotionSchema =  Schema({
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
    dateStart: {
        type: Date
    },
    dateEnd: {
        type: Date
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

PromotionSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Promotion',  PromotionSchema);