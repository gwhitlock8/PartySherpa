var db = require('../models');
var message = require('../utils/messages-sms');
var router = require('express').Router();
//returns a full guest lists based on the event that is selected
router.get('/api/event/guests/:eventId/:userId', function (req, res) {
    var eventId = req.params.eventId;
    var userId = req.params.userId;

    db.user_event.findOne({
        where: {
            eventId: eventId,
            host: false,
            userId: userId
        },
        include: [{
            model: db.user,
            attributes: ['phone', 'firstname', 'lastname']
        }]
    }).then(function (data) {
         message.sendMessage(data);
         res.redirect("/dashboard/" + req.session.passport.user);
    });
});
// router.post('api/event/:eventid/:userid', function(req,res){
//     message.receiveMessage(req,res)
// });
//PUT route for updating user dinner options and RSVP
router.post("/api/event/sms", function (req, res) {
    message.receiveMessage(req, res);
});

module.exports = router;