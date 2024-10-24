
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

export const fetch = async (req,res) => {
    try {
        return res.json('hello wolrd')
    } catch (error) {
        return res.status(500).json({error:"internal server error"})
    }
}