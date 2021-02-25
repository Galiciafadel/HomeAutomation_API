const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    equipmentArray:[equipmentSchema]

},{
    timestamps: true
});

var Rooms = mongoose.model('Room', roomSchema);

module.exports = Rooms;