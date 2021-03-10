const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const EquipmentType = require('../schemas/equipmentType');

const equipmentTypeRouter = express.Router();

equipmentTypeRouter.use(bodyParser.json());

equipmentTypeRouter.route('/')
    .get((req,res,next) => {
        EquipmentType.find({})
            .then((equipmentsType) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(equipmentsType);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        EquipmentType.create(req.body)
            .then((equipmentType) => {
                console.log('Equipment Type Created ', equipmentType);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(equipmentType);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports= equipmentTypeRouter;