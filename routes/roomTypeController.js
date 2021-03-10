const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const RoomType = require('../schemas/roomType');

const roomTypeRouter = express.Router();

roomTypeRouter.use(bodyParser.json());

roomTypeRouter.route('/')
    .get((req,res,next) => {
        RoomType.find({})
            .then((roomsType) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(roomsType);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        RoomType.create(req.body)
            .then((roomType) => {
                console.log('Room Type Created ', roomType);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(roomType);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
module.exports= roomTypeRouter;