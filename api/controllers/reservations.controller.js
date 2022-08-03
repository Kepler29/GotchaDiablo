const { request, response } = require('express');
const { Reservation, User } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");

const reservationsGetPublic = async (req, res = response) => {

    const user = req.user;

    const [ totalReservations, reservations] = await Promise.all([
        Reservation.countDocuments({delete:false, active:true, user}),
        Reservation.find({delete:false, active:true, user}).populate('user')
    ]);

    res.json({
        totalReservations,
        reservations,
    });
};

const reservationGetPublic = async ( req = request, res = response) => {

    const user = req.user;
    const slug = req.params.slug;

    const reservation = await Reservation.findOne({slug, user}).populate('user');
    res.status(200).json({
        reservation
    });
}

const reservationsGet = async (req, res = response) => {

    const [ total, reservations ] = await Promise.all([
        Reservation.countDocuments({delete:false}),
        Reservation.find({delete:false}).populate('user')
    ]);

    res.json({
        total,
        reservations
    });
};

const reservationPost = async (req = request, res = response) => {

    let { user, date } = req.body;
    user = await User.findById(user);

    const reservation = new Reservation({user, date});

    // Guardar en Base de datos
    await reservation.save();

    res.json({
        reservation
    })
}

const reservationActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [reservation] = await Promise.all([
        Reservation.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        reservation,
        authenticatedUser
    });
}

const reservationShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const reservation = await Reservation.findById(id).populate('user');
    res.status(200).json({
        reservation
    });
}

const reservationPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { user, date } = req.body;
    user = await User.findById(user);

    const reservation = await Reservation.findByIdAndUpdate(id, {user, date}, {new:true});

    res.status(201).json({
        reservation
    });
}

const reservationDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [reservation] = await Promise.all([
        Reservation.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        reservation,
    });
}

module.exports = {
    reservationsGetPublic,
    reservationGetPublic,
    reservationsGet,
    reservationPost,
    reservationActive,
    reservationShow,
    reservationPut,
    reservationDelete
}
