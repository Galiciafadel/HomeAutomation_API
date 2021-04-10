const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let ObjectId = require('mongodb').ObjectID;


const Rooms = require('../schemas/rooms');

const roomRouter = express.Router();

roomRouter.use(bodyParser.json());

roomRouter.route('/')
    .get((req,res,next) => {
        Rooms.find(req.query)
            // .populate('apartmentTypeId')
            .populate('roomTypeId')
            .populate('equipment')
            .populate('equipment.equipmentTypeI')
            .then((rooms) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rooms);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        req.body.roomTypeId = new ObjectId(req.body.roomTypeId);
        Rooms.create(req.body)
            .then((room) => {
                console.log('Room Created ', room);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(room);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put( (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /rooms/');
    })
    .delete((req, res, next) => {
        Rooms.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

roomRouter.route('/:roomId')
    //.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get((req,res,next) => {
        Rooms.findById(req.params.roomId)
            .populate('equipment')
            .populate('equipment.equipmentTypeId')
            .then((room) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(room);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /rooms/'+ req.params.roomId);
    })
    .put( (req, res, next) => {
        Rooms.findById(req.params.roomId)
            .then((room) => {
                if (room != null) {
                    //req.body.author = req.user._id;
                    Rooms.findByIdAndUpdate(req.params.roomId, {
                        $set: req.body
                    }, { new: true })
                        .then((room) => {
                            Rooms.findById(room._id)
                                .populate('equipment')
                                .populate('equipment.equipmentTypeId')
                                .then((room) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(room);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Room ' + req.params.roomId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Rooms.findById(req.params.roomId)
            .then((room) => {
                if (room != null) {
                    Rooms.findByIdAndRemove(req.params.roomId)
                        .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
                else {
                    err = new Error('Room ' + req.params.roomId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = roomRouter;