const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const equipmentSchema=require('../schemas/equipment');
//const User=require('../schemas/user');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
});

const roomSchema = new Schema({
    current: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required:true

    },
    roomTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomsType'
    },
    equipment:[equipmentSchema]

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
    user:[User]
},{
    timestamps: true
});



var Apartments = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartments;