//bcrypt use for password hashing 
const bcrypt = require('bcryptjs');
//jwt form token 
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const { sendWelcomeEmail , sendGoodbayEmail} = require('../emails/account')

exports.createUser = (req, res, next) => {
    const userData = new User(req.body);

    const token = jwt.sign(
        {name: userData.name, email: userData.email, userId: userData._id},
        process.env.JWT_KEY,
        {expiresIn: "24h"}
    ); 
       
    const urlhost = req.protocol + "://" + req.get("host");
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password:hash,
            tempraryToken: token
        });
        console.log(token);
        
        user.save()
        .then((result) => {
            if (!result) {
                res.status(401).json({
                    message: "Auth Failed!"
                });
            }
            sendWelcomeEmail(userData.email, userData.name, userData.password,token, urlhost, (err,data) => {
                if (err) {
                    console.log("erroris here", err);
                }
                console.log(data);
            })
            res.status(200).json({
                message: "User has been Created!",
                user: result       
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                
              message: "Invalid Authentication Credentials!"
            });
        });
    })
}

exports.activeAccount = (req, res, next) => {
    const token =  req.query.token
    User.findOne({tempraryToken : token}) 
    .then((result) => {
        const decodedToken = jwt.verify(result.tempraryToken,process.env.JWT_KEY);
        if (!decodedToken) {
            res.status(404).json({
                message: "token has been Expired!"
            });
        } 
        
        User.updateOne({_id: result._id}, {tempraryToken : false, active: true})
        .then((result) => {
            res.status(200).json({
                message: "Account has been verified!"
            });
        }).catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "status not update!"
            });
        });
    }).catch((err) => {
        console.log(err);

        res.status(404).json({
            message: "token not Found!"
        });
    });
    
}

exports.userLogin = (req, res, next) => {
    let user;
    User.findOne({email: req.body.email})
    .then( userData => {
        if (!userData) {
            res.status(401).json({
                message: "Auth Failed!"
            });
        } else if(!userData.active === true){
            res.status(401).json({
                message: "Your account is not verify!. Please check your Email"
            });
        }
        user = userData; 
        return bcrypt.compare(req.body.password , user.password);
    })
    .then((result) => {
        if (!result) {
            res.status(401).json({
                message: "Auth Failed!"
            });
        }
        const token = jwt.sign(
            {name: user.name, email: user.email, userId: user._id},
            process.env.JWT_KEY,
            {expiresIn: "1h"}
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: user._id,
            name: user.name,
            message: "Successfully LogIn"

        });
    })
    .catch((err) => {
        res.status(401).json({
             message: "Invalid Authentication Credentials!"
        });
    });
}