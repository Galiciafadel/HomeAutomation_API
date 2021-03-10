const express = require('express');
const router = express.Router();
const User = require('../schemas/User');
const Bcrypt = require('bcryptjs');
const responseHandler = require('../services/responseHandler');

//ROUTES
router.get('/',  (req, res) => {
    try{
        const users =  User.find();
        res.json(users).status(200);
    }
    catch(err){
        res.json({message: "Error " + err}).status(500);
    }
});

router.post('/login', (req, res) => {
    try{
        const user = User.findOne({ username: req.body.username });
        let authResponse = {};

        if(!user) {
            authResponse = responseHandler.handleResponse(null, 404, false, 'user not found, wrong username');
            res.send(authResponse).status(404);
            return ;
        }

        const hash = Bcrypt.compare(req.body.password, user.password);
        if(!hash){
            authResponse = responseHandler.handleResponse(null, 404, false, 'user not found, wrong password');
            res.send(authResponse).status(404);
            return ;
        }

        authResponse = responseHandler.handleResponse(user, 200, true, 'user found');
        res.send(authResponse).status(200);
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
        res.json(savedUser);
    }
    catch(err){
        res.json({message: err});
    }

});


module.exports = router;
