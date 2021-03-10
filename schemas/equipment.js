const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {MongoClient, ObjectID}= require('mongodb');

const equipmentSchema = new Schema({
    goal: {
        type: Number,
        required: true
    },
    current: {
        type: Number,
        required: true
    },
    turnedOn: {
        type: Boolean,
        required: true
    },
    networkAddress:{
        type: String,
        required:true

    },
    equipmentTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EquipmentType'
    }

},{
    timestamps: true
});

let equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = equipment;
