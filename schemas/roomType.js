const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imagePath: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let RoomsType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomsType;