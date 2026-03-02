const express = require('express');
const userSendMail = require('../userSendMail');
const router = express.Router()

router.post('/contact', async (req, res) => {
    try {
        const { email, fullname, message } = req.body;
        console.log(email, fullname, message)


        await userSendMail(email, fullname, message);

        res.status(200).json({
            message: 'Message is  sent'
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})


module.exports = router
