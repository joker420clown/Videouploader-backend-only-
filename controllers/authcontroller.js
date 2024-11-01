const User =  require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async(req, res) => {
    const  {username,email,password} = req.body;
    try{
        const hasedpassword = await bcrypt.hash(password,10)
        const user = new User({username,email,password:hasedpassword})
        await user.save();
        res.status(201).json({message:'User registered successfully'})
    }
    catch(error){
        res.status(400).User({messege:'error registering user',error})
    }
};

exports.login = async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user || await bcrypt.compare(password,user.passowr)){
            return res.status(401).json({message:'Invalid email or password'})
        }
         const token = jwt.token({id:user._id},process.env.JWT_SECRET,{expiresIn: '1h'});
         res.status(200).json({messege:'User logged in successfully',token})
    }
    catch(error){
        res.status(500).json({messege:'Error logging in',error})
    }

};
