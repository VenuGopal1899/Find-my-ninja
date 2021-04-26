const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Geo-location schema (Based on GeoJSON)
// "geometry" : {
//     "type" : "Point",
//     "coordinates" : [123.4, 12.4]
// }

const GeoSchema = new Schema({
    type : {
        type: String,
        default: "Point"
    },
    coordinates : {
        // Array of numbers
        type: [Number],

        // Planet orientation for this schema
        // 2D -> Earth will be 2D
        // 2Dsphere -> Considers Earth in a 3D aspect
        index: "2dsphere"
    }
})

// Create Ninja Schema and Model
const NinjaSchema = new Schema({
    name : {
        type: String,
        required : [true, 'Name field is required']
    },
    rank : {
        type: String
    },
    available : {
        type: Boolean,
        default: false
    },
    // Add in Geo Location Schema
    geometry : GeoSchema
});

// Pass the name of the collection in the Database (each one is ninja)
// Collection will be ninjas
// Each record will follow NinjaSchema

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;

