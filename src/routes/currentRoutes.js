const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.get('/user', async (req,res) => {
    const cu = await User.findOne({ _id: req.user._id });
    console.log(cu);
    res.send({email: cu.email});
})

module.exports=router;