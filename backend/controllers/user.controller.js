import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessToken, generateRefreshToken, generateVerifyToken } from "../utils/generateTokens.js";
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({ 
    service : "gmail",
    auth : {
        user : "krishnatiwari6756@gmail.com",
        pass:"fljsypxmyzyhvykm"
    }
})

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
            user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
          );
    }
}

const registerUser = asyncHandler(async (req, res) => {
const {userFirstName, userLastName, userEmail, userPassword, userType } = req.body;

if(!userFirstName || !userLastName || !userEmail || !userPassword) {
    throw new ApiError(400, "All fields are required");
}

const existedUser = await User.findOne({userEmail});


if(existedUser) {
    throw new ApiError(409, "User with email already exists")
}

const hashedPassword = await bcrypt.hash(userPassword, 10);

const user = await User.create({
    userFirstName,
    userLastName,
    userEmail,
userPassword : hashedPassword,
userType
})

const createdUser = await User.findById(user._id).select("-userPassword -refreshToken")

if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully" ))

})

const loginUser = asyncHandler(async (req, res) => {
    const {userEmail, userPassword} = req.body;

const user = await User.findOne({userEmail});

if(!user) {
    throw new ApiError(404, "User does not exit");
}

// const loginPassword = bcrypt.hash(userPassword, 10);
// const isPasswordValid = loginPassword === user.userPassword;

const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword)

if(!isPasswordValid) {
    throw new ApiError(401, "Invalid user Password")
};

const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

const loggedInUser = await User.findById(user._id).select("-userPassword -refreshToken")

const options = {
    httpOnly : true,
    secure : true
}


return res
.status(200)
.cookie("accessToken" , accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(new ApiResponse(200,loggedInUser, "User logged In Successfully"))

})



const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(req.user?._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true,
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .clearCookie("firstName", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))

})


const refreshAccessToken = asyncHandler(async(req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {

        const decodedToke = jwt.verify(incomingRefreshToken,  process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToke?._id);

        if(!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
          }

          const options = {
            httpOnly : true, 
            secure : true
          };

          const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");

    }

})


const sendLinkToResetPassword = asyncHandler(async(req, res) => {
    const {userEmail} = req.body;

    console.log(userEmail);
    const user = await User.findOne({userEmail});
console.log("success")


    if(!user) {
        throw new ApiError(404, "User does not exists")
    } 

    try {

     const verifyToken =  generateVerifyToken(user);
console.log(verifyToken)
    console.log("successagain")
    user.verifyToken = verifyToken
console.log("har har mahadev")

        // "user" aur "User" me bahut bada difference hai user apne property fo call kar sakta hai bas na ki mongodb ke methods ko. that why findByIdAndUpdate user "User" to call not user

    const setUserVerifyToken = await User.findByIdAndUpdate({_id : user._id}, {$set : {verifyToken : verifyToken}},{new : true})
console.log("successagainagain")
    console.log(setUserVerifyToken)

    if(setUserVerifyToken) {
        const mailOptions = {
            from : "krishnatiwari6756@gmail.com",
            to : userEmail,
            subject : "Reset Password", 
            text : `This Link is valid for 2 minutes ${"\n\n"}http://localhost:5173/reset-password/${user._id}/${user.verifyToken}` 
        }

        transporter.sendMail(mailOptions, (error,info) => {
            if(error) {
                throw new ApiError(401, "Error while sending Email, Email not Send")
            }

            console.log("Email Sent", info.response)

       return res.status(201).json(new ApiResponse(201, info, "Email send Successfully" ))

        })
    }

    } catch (error) {
        throw new ApiError(401, "Something went Wrong, Check your Email and try again")

    }

})


const validateUserForResettingPassword = asyncHandler(async(req,res) => {
    const {id, token} = req.params;

    try {

        const user = await User.findOne({_id : id, verifyToken: token});

     const verifyToken =  jwt.verify(token, process.env.VERIFY_TOKEN_SECRET );


     if(user.verifyToken != verifyToken) {
        throw new ApiError(401, "User Does Not Exists")
     }

   return  res.status(200).json(new ApiResponse(200, {},   "User Successfully Validate"))

        
    } catch (error) {
        
        throw new ApiError(401, "Error, User not verfied")

    }
})

const resetAndupdatePassword = asyncHandler(async(req, res) => {
try {
    
        const {userPassword} = req.body; 

        const {id, token} = req.params;

        const newHashedPassword = await bcrypt.hash(userPassword, 10);
    
        const passwordUpdated = await User.findByIdAndUpdate({_id : id}, { $set : {userPassword : newHashedPassword}})
    //   console.log(req.user._id)
        // console.log(passwordUpdated)

        if(!passwordUpdated) {
            throw new ApiError(401, "Password updation unsuccessfull, please try again later")
        }
    
        
      return  res.status(201).json(new ApiResponse(201, {}, "Password updated successfully"))

    
} catch (error) {
    console.log(error)
}
})


export {registerUser, loginUser, logoutUser, sendLinkToResetPassword, validateUserForResettingPassword, resetAndupdatePassword}