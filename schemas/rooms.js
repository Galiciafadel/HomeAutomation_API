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
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    equipment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    }]
},{
    timestamps: true
});

let rooms = mongoose.model('Room', roomSchema);

module.exports = rooms;