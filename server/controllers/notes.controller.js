import USER from "../mongo/models/user.js";
import NOTE from "../mongo/models/notes.js";

const createNote = async (req, res) => {
    const { note } = req.body;
    const userId = req.userId;
    const lastModifiedAt = new Date();

    try {
        const user = await USER.findById(userId);
        if (!user) throw new Error("User not Found!");

        const newNote = await NOTE.create({
            note,
            creator: userId,
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString()
        });

        await USER.findOneAndUpdate({ _id: userId }, { $push: { allNotes: newNote._id }, lastModifiedAt });
        res.status(200).json({ id: newNote.id, note: newNote.note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotes = async (req, res) => {
    const userId = req.userId;
    const noteList = [];

    try {
        const list = await NOTE.find({ 'creator': userId });
        list.forEach(note => {
            noteList.push({ id: note._id, note: note.note });
        });
        res.status(200).json(noteList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateNote = async (req, res) => {
    const userId = req.userId;
    const { id, note } = req.body;
    const lastModifiedAt = new Date();

    try {
        await NOTE.findOneAndUpdate({ '_id': id, creator: userId }, { note, lastModifiedAt });
        res.status(200).json({ message: 'Note Updated!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteNote = async (req, res) => {
    const idToDelete = req.params.id;
    const userId = req.userId;
    const lastModifiedAt = new Date();

    try {
        await NOTE.deleteOne({ 'creator': userId, '_id': idToDelete });
        await USER.findByIdAndUpdate(userId, {
            $pull: { allNotes: idToDelete },
            lastModifiedAt
        })
        res.status(200).json({ message: 'Note Deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateOrder = async (req, res) => {
    const userId = req.userId;
    const { newOrder } = req.body;
    const lastModifiedAt = new Date();

    let updatedIds = []

    newOrder.map((item) =>
        updatedIds.push(item.id)
    );

    try {
        await USER.findByIdAndUpdate(userId,
            {
                allNotes: updatedIds,
                lastModifiedAt
            });
        res.status(200).json({ message: 'Order Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export { createNote, getNotes, updateNote, updateOrder, deleteNote };