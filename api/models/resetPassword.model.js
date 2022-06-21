const { Schema, model } = require('mongoose');

const ResetPasswordSchema =  Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
        unique: true,
        required: [true, 'El token es obligatorio']
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

ResetPasswordSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('ResetPassword',  ResetPasswordSchema);
