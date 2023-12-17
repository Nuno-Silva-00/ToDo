import mongoose from "mongoose";

import USER from "../mongo/models/user.js";
import TODO from "../mongo/models/todo.js";

const createToDo = async (req, res) => {
    const { todo } = req.body;
    const userId = req.userId;

    try {
        const user = await USER.findById(userId);
        if (!user) throw new Error("User not Found!");

        const newToDo = await TODO.create({
            todo,
            createdAt: new Date().toISOString(),
            creator: userId
        });

        await USER.findOneAndUpdate({ _id: userId }, { $push: { allToDos: newToDo._id } })
        res.status(200).json({ id: newToDo.id, toDo: newToDo.todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getToDo = async (req, res) => {
    const userId = req.userId;
    let toDoList = [];
    let orderList = [];
    let finalList = [];

    try {
        const list = await TODO.find({ 'creator': userId });

        const user = await USER.findById(userId);

        list.forEach(toDo => {
            toDoList.push({ id: toDo._id, toDo: toDo.todo });
        });

        user.allToDos.forEach(id => {
            orderList.push(id);
        });

        orderList.forEach(id => {
            toDoList.forEach(toDo => {
                if (id == toDo.id.toHexString()) {
                    finalList.push(toDo);
                }
            });
        });

        res.status(200).json(finalList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateToDo = async (req, res) => {
    const userId = req.userId;
    const { id, toDo } = req.body;

    try {
        await TODO.findOneAndUpdate({ '_id': id, creator: userId }, { todo: toDo });
        res.status(200).json({ message: 'ToDo Updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteToDo = async (req, res) => {
    const idToDelete = req.params.id;
    const userId = req.userId;

    try {
        await TODO.deleteOne({ 'creator': userId, '_id': idToDelete });
        await USER.findByIdAndUpdate(userId, {
            $pull: { allToDos: idToDelete }
        })
        res.status(200).json({ message: 'ToDo Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    const userId = req.userId;
    const { newOrder } = req.body;

    let updatedIds = []

    newOrder.map((item) =>
        updatedIds.push(item.id)
    );

    try {
        await USER.findByIdAndUpdate(userId,
            {
                allToDos: updatedIds
            });
        res.status(200).json({ message: 'Order Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export { createToDo, getToDo, updateToDo, updateOrder, deleteToDo };