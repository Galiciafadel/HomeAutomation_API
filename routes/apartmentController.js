const express = require('express');
const router = express.Router();
const Apartment = require('../schemas/apartments');

router.get('/',(req,res)=>{
    try{
        const apartments=Apartment.find();
        res.json(apartments).status(200);
    }
    catch (err){
        res.json({message:err}).status(500);
    }
});

router.post('/',(req,res)=>{
    const apartment=new Apartment({
        name: req.body.name,
        apartmentTypeId: req.body.apartmentTypeId,
        //roomsArray: req.body.room
        //usersArray:
    });
    try{
        const savedApartment = apartment.save();
        res.json(savedApartment).status(200);
    }
    catch(err){
        res.json({message: err}).status(500);
    }
});

router.delete('/:apartmentId', (req, res) => {
    try{
        const removedApartment = Apartment.remove({_id: req.params.apartmentId});
        res.json(removedApartment);
    }
    catch(err){
        res.json({message: err});
    }
});

module.exports= router;


