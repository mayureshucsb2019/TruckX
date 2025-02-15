const jwt = require("jsonwebtoken");
const url = require('url');
const {SOME_RANDOM_SECRET} = require("../utils/constants");

const isAuth = function(req, res,next){
    const token = url.parse(req.url,true).query.token;
    console.log("token received at isAuth: ", token);
    let decodedToken = "";
    try{
        // the random secret should ideally be gotten from database 
        decodedToken = jwt.verify(token, SOME_RANDOM_SECRET);
    }catch(err){
        console.log("Problem decoding token!");
        err.statuscode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error("Authetication failed!!!");
        error.statuscode = 401;
        throw error;
    }
    req.imei = decodedToken.imei;
    next();
};

module.exports = isAuth;