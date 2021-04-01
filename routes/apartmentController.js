const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Apartments = require('../schemas/apartments');

let ObjectId = require('mongodb').ObjectID;

const apartmentRouter = express.Router();

apartmentRouter.use(bodyParser.json());

apartmentRouter.route('/')
    .get((req,res,next) => {
        Apartments.find({})
            .populate('rooms.roomsTypeId')
            .then((apartments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        req.body.apartmentTypeId = new ObjectId(req.body.apartmentTypeId);
        Apartments.create(req.body)
            .then((apartment) => {
                console.log('Apartment Created ', apartment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /apartments');
    })

apartmentRouter.route('/:apartmentId')
    .get((req,res,next) => {
        Apartments.findById(req.params.apartmentId)
            .populate('rooms.roomsTypeId')
            .then((apartment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /apartments/'+ req.params.apartmentId);
    })
    .put((req, res, next) => {
        Apartments.findById(req.params.apartmentId, (err, doc) => {
            let users = doc.users;
            users.push(req.body.user);
            doc.save();

        }, { new: true })
            .then((apartment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Apartments.findByIdAndRemove(req.params.apartmentId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

apartmentRouter.route('/:apartmentId/rooms')
    .get((req,res,next) => {
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(apartment.rooms);
                }
                else {
                    err = new Error('Apartment ' + req.params.apartmentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        //req.body.apartmentTypeId = new ObjectId(req.body.apartmentTypeId)
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null) {
                    req.body.rooms = new ObjectId(req.body.rooms)
                    apartment.rooms.push(req.body);
                    apartment.save()
                        .then((apartment) => {
                            Apartments.findById(apartment._id)
                                .populate('rooms.roomTypeId')
                                .then((apartment) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(apartment);
                                })
                        }, (err) => next(err));
                }
                else {
                    err = new Error('Apartment ' + req.params.apartmentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null && apartment.rooms.id(req.params.roomId) != null) {

                    apartment.rooms.id(req.params.roomId).remove();
                    apartment.save()
                        .then((apartment) => {
                            Apartments.findById(apartment._id)
                                .populate('rooms.roomTypeId')
                                .then((apartment) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(apartment);
                                })
                        }, (err) => next(err));
                }
                else if (apartment == null) {
                    err = new Error('Apartment ' + req.params.apartmentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Room ' + req.params.roomId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

apartmentRouter.route('/:apartmentId/rooms/:roomId')
    .get((req,res,next) => {
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null && apartment.rooms.id(req.params.roomId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(apartment.rooms.id(req.params.roomId));
                }
                else if (apartment == null) {
                    err = new Error('Apartment ' + req.params.apartmentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Room ' + req.params.roomId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /apartments/'+ req.params.apartmentId
            + '/rooms/' + req.params.roomId);
    })
    .put((req, res, next) => {
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null && apartment.rooms.id(req.params.roomId) != null) {
                    if (req.body.equipment) {
                        apartment.rooms.id(req.params.roomId).equipment = req.body.equipment;
                    }
                    apartment.save()
                        .then((apartment) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(apartment);
                        }, (err) => next(err));
                }
                else if (apartment == null) {
                    err = new Error('Apartment ' + req.params.apartmentId + ' not found');
                    err.status = 404;
                    return next(err);
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
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null && apartment.rooms.id(req.params.roomId) != null) {
                    apartment.rooms.id(req.params.roomId).remove();
                    apartment.save()
                        .then((apartment) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(apartment);
                        }, (err) => next(err));
                }
                else if (apartment == null) {
                    err = new Error('Apartment ' + req.params.apartmentId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Room ' + req.params.roomId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = apartmentRouter;
