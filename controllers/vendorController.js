const  Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();


const secretKey = process.env.WhatIsYourName;


const vendorRegistration = async(req, res)=>{
    const {username, email, password} = req.body

    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newVendor = new Vendor({
        username,
        email,
        password: hashedPassword
       });
       await newVendor.save();
       res.status(201).json({message: "vendor registered succesfully"});
       console.log("registered");
    }catch(err){
        res.status(500).json("unable to register");
        console.log(err);
    }

}
const vendorLogin = async(req, res)=>{
    const {username, email, password} = req.body
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || (! await bcrypt.compare(password, vendor.password)))
        {
        return res.status(401).json({error: "Invalid Username/ Password"})}
        const token = jwt.sign({vendorId: vendor._id}, secretKey);
        res.status(200).json({success: "Login Successfull", token});
        console.log(email, "This is the token", token);

    }catch(err){
      console.log(err);


    }
}

const getAllVendors = async(req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getSingleVendor = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate("firm");
       if(!vendor){
        return res.status(404).json({error: "Vendor not found"});
        
       }
       res.status(200).json({vendor});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {vendorRegistration, vendorLogin, getAllVendors, getSingleVendor};