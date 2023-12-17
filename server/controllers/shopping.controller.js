import USER from "../mongo/models/user.js";
import SHOPPING from "../mongo/models/shopping.js";

const createItem = async (req, res) => {
    const { item, amount } = req.body;
    const userId = req.userId;

    try {
        const user = await USER.findById(userId);
        if (!user) throw new Error("User not Found!");

        const newItem = await SHOPPING.create({
            item,
            amount,
            createdAt: new Date().toISOString(),
            creator: userId
        });

        await USER.findOneAndUpdate({ _id: userId }, { $push: { allItems: newItem._id } })
        res.status(200).json({ id: newItem.id, item: newItem.item, amount: newItem.amount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItems = async (req, res) => {
    const userId = req.userId;
    const itemList = [];

    try {
        const list = await SHOPPING.find({ 'creator': userId });
        list.forEach(item => {
            itemList.push({ id: item._id, item: item.item, amount: item.amount });
        });
        res.status(200).json(itemList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateItem = async (req, res) => {
    const userId = req.userId;
    const { id, item, amount } = req.body;

    try {
        await SHOPPING.findOneAndUpdate({ '_id': id, creator: userId }, { item, amount });
        res.status(200).json({ message: 'Shopping list item Updated!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteItem = async (req, res) => {
    const idToDelete = req.params.id;
    const userId = req.userId;

    try {
        await SHOPPING.deleteOne({ 'creator': userId, '_id': idToDelete });
        await USER.findByIdAndUpdate(userId, {
            $pull: { allItems: idToDelete }
        })
        res.status(200).json({ message: 'Shopping list item Deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export { createItem, getItems, updateItem, deleteItem };