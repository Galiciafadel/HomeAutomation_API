const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Apartments = require('../schemas/apartments');

const apartmentRouter = express.Router();
//var authenticate = require('../authenticate');


apartmentRouter.use(bodyParser.json());

apartmentRouter.route('/')
    .get((req,res,next) => {
        Apartments.find({})
            .populate('rooms.roomsTypeId')
            .then((apartments) => {
                console.log('Hello');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(apartments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
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
    .delete( (req, res, next) => {
        Apartments.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

apartmentRouter.route('/:apartmentId')
    .get((req,res,next) => {
        Apartments.findById(req.params.apartmentId)
            .populate('rooms.roomsTypeId')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /apartments/'+ req.params.apartmentId);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /apartments/'+ req.params.apartmentId);
    })


apartmentRouter.route('/:apartmentId/rooms')
    .get((req,res,next) => {
        Apartments.findById(req.params.dishId)
            .populate('rooms.roomTypeId')
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
        Apartments.findById(req.params.apartmentId)
            .then((apartment) => {
                if (apartment != null) {
                    req.body.author = req.user._id;
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
                                .then((dish) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(dish);
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
                    err = new Error('Apartment ' + req.params.roomId + ' not found');
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
        res.statusCode = 403;
        res.end('PUT operation not supported on /apartments/'+ req.params.apartmentId
            + '/rooms/' + req.params.roomId);
    })
    .delete((req, res, next) => {
        Apartments.findById(req.params.roomId)
            .then((apartment) => {
                if (apartment != null && apartment.rooms.id(req.params.roomId) != null) {

                    if (apartment.rooms.id(req.params.roomId).roomTypeId.equals(req.user._id)===false) {
                        err = new Error('You are not authorized to delete this room');
                        err.status = 403;
                        return next(err);
                    }

                    apartment.rooms.id(req.params.roomId).remove();
                    apartment.save()
                        .then((apartment) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(apartment);
                        }, (err) => next(err));
                }
                else if (apartment == null) {
                    err = new Error('Apartment ' + req.params.roomId + ' not found');
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
