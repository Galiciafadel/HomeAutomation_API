const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ApartmentType = require('../schemas/apartmentType');

const apartmentTypeRouter = express.Router();

apartmentTypeRouter.use(bodyParser.json());

apartmentTypeRouter.route('/')
    .get((req,res,next) => {
        ApartmentType.find({})
            .then((apartmentsType) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartmentsType);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        ApartmentType.create(req.body)
            .then((apartmentType) => {
                console.log('Apartment Type Created ', apartmentType);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartmentType);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports= apartmentTypeRouter;