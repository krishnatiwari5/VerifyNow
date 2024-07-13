import jwt from "jsonwebtoken"

const generateAccessToken = (user)=> {
    return jwt.sign (
        {
            _id : user._id,
            userFirstName : user.userFirstName,
            userLastName : user.userLastName,
            userEmail : user.userEmail
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id : user._id,
            userEmail : user.userEmail
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const generateVerifyToken = (user) =>  {
   return jwt.sign({
        _id : user._id
                },
                process.env.VERIFY_TOKEN_SECRET,
                {
                    expiresIn : process.env.VERIFY_TOKEN_EXPIRY
                }
            )
}

export {generateAccessToken, generateRefreshToken, generateVerifyToken}