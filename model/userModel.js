import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Trims white space
    },
    email: {
        type: String,
        required: true,
    },
   
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model('User', userSchema);
