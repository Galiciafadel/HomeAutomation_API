const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentTypeSchema = new Schema({
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

var EquipmentType = mongoose.model('EquipmentType', equipmentTypeSchema);

module.exports = EquipmentType;