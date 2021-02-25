const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    apartmentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApartmentsType'
    },
    roomsArray:[roomSchema],
    usersArray:[User]
},{
    timestamps: true
});

var Apartments = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartments;