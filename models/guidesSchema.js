var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var guideModel = new Schema({
    name: { type: String },
    email: { type: String },
    location: {
        latitude: {
            type: String
        },
        longitutde: {
            type: String
        }
    },
    phone: { type: String },
    role: { type: String }
});

module.exports = mongoose.model('Guide', guideModel);