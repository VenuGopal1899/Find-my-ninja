const express = require('express');
const router = express.Router();
const Ninja  = require('../models/ninja');

// Get a list of Ninjas from the Database
router.get('/ninjas', (request, response, next) => {
    // Send all Ninjas
    // Ninja.find({}).then((ninjas) => {
    //     response.send(ninjas);
    // })

    // We'll pass latitude and longitude to find nearby ninjas
    // Passing as URL Parameters
    Ninja.aggregate().near({
        near: {
            type: 'Point',
            coordinates: [parseFloat(request.query.lng), parseFloat(request.query.lat)]
        },
        maxDistance: 100000, // 100 KMs
        spherical: true,
        distanceField: 'distance'
    }).then((ninjas) => {
        if(ninjas.length == 0){
            response.send([])
        }
        response.send(ninjas);
    })
})

// Add a new ninja to the Database
router.post('/ninjas', (request, response, next) => {

    // var ninja = new Ninja(request.body);

    // We want to refer to the ninja Collection
    // Mongoose provided us to save this ninja object to ninja Collection
    // which is saved as ninjas in the database
    // ninja.save()

    // Instead of creating a new instance and then saving it
    // We can use create method in Ninja provided by mongoose
    // It returns a promise

    Ninja.create(request.body).then((ninja) => {
        response.send(ninja);
    }).catch(next);
})

// Update a ninja in the Database
router.put('/ninjas/:id', (request, response, next) => {
    Ninja.findByIdAndUpdate({_id : request.params.id}, request.body). then(() => {
        Ninja.findOne({_id : request.params.id}).then((ninja) => {
            response.send(ninja);
        });
    });
});

// Delete a ninja from the Database
router.delete('/ninjas/:id', (request, response, next) => {
    // console.log(request.params.id);
    Ninja.findByIdAndRemove({_id : request.params.id}).then((ninja) => {
        response.send(ninja);
    })
})

module.exports = router;