const { request, response } = require('express');
const nodemailer = require('nodemailer');
const { User, ResetPassword } = require("../models");


const host = process.env.HOSTEMAIL;
const emailGlobal = process.env.EMAIL;
const emailContact = process.env.EMAILCONTACT;
const password = process.env.PASSWORDEMAIL;

let transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: emailGlobal,  // generated ethereal user
        pass: password, // generated ethereal password
    },
});

const sendContact = async (req, res = response) => {

    // transporter.verify().then( () => {
    //     console.log('listo');
    // }, errorFunc => {
    //     console.log(errorFunc);
    // });

    const { name, email, telephone, message } = req.body;

    const messageAll = `Nombre: ${name} \n Email: ${email} \n Telefono: ${telephone} \n Mensaje: ${message}`;

    let mailOptions = {
        from: emailGlobal,
        to: emailContact,
        subject: 'Contacto',
        text: messageAll
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json({
                error,
                info
            });
        } else {
            res.status(201).json({
                ok: true,
                info
            });
        }
    });
};

const findUserPost = async (req, res = response) => {

    let { email, url } = req.body;

    const user = await User.findOne({email});
    url = `${url}/sign/password/reset/`;

    if (!user){
        return res.status(400).json({
            msg: `El correo ${email} no se puedo encontrar en la base de datos`
        })
    }
    let date = new Date().toISOString();
    date = date.replace(/-/g, '');
    date = date.replace(/:/g, '');
    date = date.replace('.', '');
    date = date.replace(' ', '');
    let token = user._id + date;

    let resetDB = await ResetPassword.findOne({user:user._id});

    if(!resetDB){
        const reset = new ResetPassword({user, token});
        await reset.save();
    } else {
        await ResetPassword.findByIdAndUpdate(resetDB._id,{token, active:true, delete:false}, {new:true})
    }

    const html = '<html xmlns="http://www.w3.org/1999/html">' +
        '<body>' +
        '<h1 style="text-align: center" >Hola  '+ user.name +', se detecto que desea restaurar su contraseña, si no es asi haga caso omiso a'+
        'este mensaje en caso de lo contrario de click en el boton  o en el link de abajo</h1>' +
        '<a href="'+ url + token +'" style="display: inline-block;\n' +
        '  font-weight: 400;\n' +
        '  line-height: 1.5;\n' +
        '  text-align: center;\n' +
        '  text-decoration: none;\n' +
        '  vertical-align: middle;\n' +
        '  cursor: pointer;\n' +
        '  -webkit-user-select: none;\n' +
        '  -moz-user-select: none;\n' +
        '  user-select: none;\n' +
        '  padding: 0.375rem 0.75rem;\n' +
        '  font-size: 1rem;\n' +
        '  border-radius: 0.25rem;\n' +
        '  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;' +
        '  color: #fff;\n' +
        '  background-color: #0d6efd;\n' +
        '  border-color: #0d6efd;"> Click</a> </br>'+
        ' <p>Click al link de abajo</p>' +
        '<a href="'+ url + token +'">'+ url + token +'</a>' +
        '</body></html>';

    let mailOptions = {
        from: emailGlobal,
        to: email,
        subject: 'Recuper Contraseña',
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json({
                error,
                info
            });
        } else {
            res.status(201).json({
                ok: true,
                user,
                info
            });
        }
    });
};

module.exports = {
    sendContact,
    findUserPost
}
