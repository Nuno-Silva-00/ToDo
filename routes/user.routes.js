import express from "express";

import { createUser, loginUser } from "../controllers/user.controller.js";
import { checkDuplicateEmail } from '../middleware/verifySignUp.js'

const router = express.Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin ",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.route('/create').post(checkDuplicateEmail, createUser);
router.route('/login').post(loginUser);

export default router;