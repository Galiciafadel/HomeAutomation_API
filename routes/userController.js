const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Bcrypt = require('bcryptjs');
const responseHandler = require('../services/responseHandler');

//ROUTES
router.get('/',  (req, res, next) => {

    User.find({}).then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users)})
        .catch(err => next(err));


});

router.post('/login', (req, res, next) => {
    try{
        User.findOne({ username: req.body.username }).then(user => {
            let authResponse = {};

            if(!user) {
                authResponse = responseHandler.handleResponse(null, 404, false, 'user not found, wrong username');
                res.send(authResponse).status(404);
                return ;
            }

            Bcrypt.compare(req.body.password, user.password).then(
                hash => {
                    if(!hash){
                        authResponse = responseHandler.handleResponse(null, 404, false, 'user not found, wrong password');
                        res.send(authResponse).status(404);
                        return ;
                    }

                    authResponse = responseHandler.handleResponse(user, 200, true, 'user found');
                    res.send(authResponse).status(200);
                })
        })
            .catch(err => next(err));

    }
    catch(err){
        res.status(500).json({message: err});
    }

})

router.post('/',  (req, res) => {
    const user = new User({
        username: req.body.username,
        password: Bcrypt.hashSync(req.body.password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        isAdmin: req.body.isAdmin,
    });
    try{
        const savedUser = user.save();
        res.json(user);
    }
    catch(err){
        res.json({message: err});
    }

});


router.delete('/:userId', (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = router;
