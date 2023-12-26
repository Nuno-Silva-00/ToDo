import express from "express";
import { createNote, getNotes, updateNote, deleteNote, updateOrder } from '../controllers/notes.controller.js'
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

router.route('/create').post(verifyToken, createNote);
router.route('/').get(verifyToken, getNotes);
router.route('/update').patch(verifyToken, updateNote);
router.route('/updateOrder').patch(verifyToken, updateOrder);
router.route('/delete/:id').delete(verifyToken, deleteNote)
export default router;