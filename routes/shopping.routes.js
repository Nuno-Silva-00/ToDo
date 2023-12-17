import express from "express";
import { createItem, getItems, updateItem, deleteItem } from '../controllers/shopping.controller.js'
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

router.route('/create').post(verifyToken, createItem);
router.route('/').get(verifyToken, getItems);
router.route('/update').patch(verifyToken, updateItem);
router.route('/delete/:id').delete(verifyToken, deleteItem)
export default router;