const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roomTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType'
    },
    equipment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    }]
},{
    timestamps: true
});


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
    rooms:[roomSchema],

    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
});

let apartments = mongoose.model('Apartment', apartmentSchema);

module.exports = apartments;
