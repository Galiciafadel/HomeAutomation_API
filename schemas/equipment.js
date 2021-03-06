const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const equipmentSchema = new Schema({
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
    equipmentTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EquipmentType'
    }

},{
    timestamps: true
});

var Equipment = mongoose.model('Equipment', equipmentSchema);

//module.exports = Equipment;