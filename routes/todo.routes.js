import express from "express";
import { createToDo, getToDo, updateToDo, updateOrder, deleteToDo, } from '../controllers/todo.controller.js'
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin ",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.route('/create').post(verifyToken, createToDo);
router.route('/').get(verifyToken, getToDo);
router.route('/update').patch(verifyToken, updateToDo);
router.route('/updateOrder').patch(verifyToken, updateOrder);
router.route('/delete/:id').delete(verifyToken, deleteToDo);
export default router;