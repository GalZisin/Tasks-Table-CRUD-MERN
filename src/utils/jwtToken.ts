//Create and send token and save in the cookie
const sendToken = (user: any, statusCode: number, res: any) => {

    //Create Jwt token
    const token = user.getJwtToken();
    //Option for cookie
    const options = {
        expires:
            new Date(
                <any>Date.now + <any>process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
        httpOnly: true //cant access by js code
    }

    res.status(statusCode).cookie('token1', token, options).json({
        success: true,
        token,
        user
    })

}

export default sendToken;