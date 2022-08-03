const { Schema, model } = require('mongoose');

const ReservationSchema =  Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    },
    date: {
        type: Date
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

ReservationSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Reservation',  ReservationSchema);