const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {MongoClient, ObjectID}= require('mongodb');

const equipmentSchema = new Schema({
    goal: {
        type: Number,
        required: true
    },
    actual: {
        type: Number,
        required: true
    },
    auto:{
        type: Boolean,
        required: false,
        default: false
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
