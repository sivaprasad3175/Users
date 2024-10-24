
import User from "../model/userModel.js"

export const create = async (req,res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;
        const userExit = await User.findOne({email});
        if(userExit){
            return res.status(400).json({message:'user exits'})
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

export const fetch = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        return res.status(200).json(users); // Return the list of users as JSON
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from URL parameters
        const updatedData = req.body; // Get updated data from the request body

        // Find the user by ID and update
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser); // Return the updated user
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
};


export const remove = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from URL parameters

        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" }); // Return success message
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
};
