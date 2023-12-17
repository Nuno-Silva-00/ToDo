import mongoose from 'mongoose';

const connection = (url) => {
    mongoose.set('strictQuery', false);

    mongoose
        .connect(url)
        .then(() => console.log(`Mongo Connected`))
        .catch(error => console.log(error));
}

export default connection;