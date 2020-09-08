const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig =  require('../passport')
const User = require('../models/User');
const JWT = require('jsonwebtoken');

const signToken = (userID, username) => {
    return JWT.sign({
        iss : "Ggihoff",
        sub : userID,
        usr : username
    }, "Ggihoff", {expiresIn : "1h"});
}

userRouter.post('/register', (req,res)=> {
    const {nombre, username, password} = req.body;

    User.findOne({username}, (err, user)=> {
        if(err)
            res.status(500).json({message: {msgBody : "Error has occured", msgError: true}})
  
        if(user)
            res.status(400).json({message: {msgBody : "Username is already taken", msgError: true}})
        else {
            const newUser = new User({nombre, username, password});
            newUser.save(err=>{
                if(err)
                     {
                    res.status(500).json({message: {msgBody : "Error has occured", msgError: true}})
                     }
                    else {
                        res.status(201).json({message: {msgBody : "Account succcessfully created", msgError: false}})
                  
                    }
            })
        }
    })
})


userRouter.post('/login', passport.authenticate('local', {session : false}), (req,res)=> {
    if(req.isAuthenticated()) {
        const {_id, username} = req.user;
        const token = signToken(_id, username);
        res.cookie('access_token', token, {httpOnly:true, sameSite:true})
        console.log(token);
        res.status(200).json({isAuthenticated : true, user : {username}})
    }

});

userRouter.get('/logout', passport.authenticate('jwt', {session : false}), (req,res)=> {

        res.clearCookie('access_token');
        res.json({ firstName: 'Tobi' });
});



userRouter.get('/a', function(req,res){

        res.cookie('access_tokenaa', 'asd', {httpOnly:true, sameSite:true})
        console.log(req.cookies);
        res.status(200).json({isAuthenticated : true})
    });

module.exports = userRouter;