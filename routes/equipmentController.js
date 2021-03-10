const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Equipment = require('../schemas/equipment');
//const {ObjectId} = require("bson").ObjectID;
let ObjectId = require('mongodb').ObjectID;

const equipmentRouter = express.Router();


equipmentRouter.route('/')
    .get((req,res,next) => {
        Equipment.find({})
            .populate('equipmentTypeId')
            .then((equipment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(equipment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        req.body.equipmentTypeId = new ObjectId(req.body.equipmentTypeId)
        Equipment.create(req.body)
            .populate('equipmentTypeId')
            .then((equipment) => {
                console.log('Equipment Created ', equipment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(equipment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete( (req, res, next) => {
        Equipment.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

equipmentRouter.route('/:equipmentId')
    .get((req,res,next) => {
        Equipment.findById(req.params.equipmentId)
            .populate('equipmentTypeId')
            .then((equipment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(equipment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /equipment/'+ req.params.equipmentId);
    })
    .put((req, res, next) => {
        Equipment.findByIdAndUpdate(req.params.equipmentId, {
            $set: req.body
        }, { new: true })
            .then((equipment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(equipment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Equipment.findByIdAndRemove(req.params.equipmentId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = equipmentRouter;
