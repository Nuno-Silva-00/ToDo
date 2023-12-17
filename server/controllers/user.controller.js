import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import USER from "../mongo/models/user.js";


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await USER.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        res.status(200).json({ accessToken: token, expiresIn: 86400 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await USER.findOne({ email });

        if (!userExists) return res.status(400).json({ message: 'EMAIL_NOT_FOUND' });

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (!passwordMatch) return res.status(400).json({ message: 'WRONG_PASSWORD' });

        const token = jwt.sign({ id: userExists.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        return res.status(200).json({ accessToken: token, expiresIn: 86400 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export { createUser, loginUser };