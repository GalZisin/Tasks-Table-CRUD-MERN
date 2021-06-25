"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Create and send token and save in the cookie
var sendToken = function (user, statusCode, res) {
    //Create Jwt token
    var token = user.getJwtToken();
    //Option for cookie
    var options = {
        expires: new Date(Date.now + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true //cant access by js code
    };
    res.status(statusCode).cookie('token1', token, options).json({
        success: true,
        token: token,
        user: user
    });
};
exports.default = sendToken;
