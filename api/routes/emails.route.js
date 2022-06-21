const { Router} = require('express');
const { sendContact } = require("../controllers/emails.controller");

const router = Router();

router.post('/send/contact', [
], sendContact);

module.exports = router;