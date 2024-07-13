import {Router} from "express"
import { loginUser, registerUser, sendLinkToResetPassword, validateUserForResettingPassword, resetAndupdatePassword, logoutUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser) 

router.post("/signin", loginUser)

//secured Routes
router.route("/logout").get(logoutUser)
router.route("/reset-password/:id/:token").get(validateUserForResettingPassword);

router.route("/reset-password-link").post(sendLinkToResetPassword)

router.route("/:id/:token").post(resetAndupdatePassword)

export default router 