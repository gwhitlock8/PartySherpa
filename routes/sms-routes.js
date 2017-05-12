var db = require('../models');
var message = require('../utils/messages-sms');
var router = require('express').Router();

//returns a full guest lists based on the event that is selected
router.get('/api/event/guests/:eventId', function (req, res) {
    var eventId = req.params.eventId;

    db.user_event.findAll({
        where: {
            eventId: eventId,
            host: false
        },
        include: [{
            model: db.user,
            attributes: ['phone', 'firstname', 'lastname']
        }]
    }).then(function (data) {
         message.sendMessage(data);
        res.quit(); 
    });
});

// router.post('api/event/:eventid/:userid', function(req,res){
//     message.receiveMessage(req,res)

// });

//PUT route for updating user dinner options and RSVP
router.put("/api/event/:eventid/:userid", function (req, res) {
    message.receiveMessage(req, res);

});

module.exports = router;