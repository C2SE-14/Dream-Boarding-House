const { response } = require('express');
const User = require('../models/user.model');
const getUserInformation = async (req, res, next) => {
    try {
        let userId = req.cookies.user.user_id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        const userInfor = await User.find({_id: userId});
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user});
    } catch(error) {
        console.log(error);
        //res.status(203).render('error')
    }
}
const updateUserInformation = async (req, res, next) => {
    try {
        console.log('Thanh công');
        const userId = req.cookies.user.user_id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        await User.where({_id: userId}).update(req.body);
        const userInfor = await User.find({_id: userId});
        const msg = "Cập nhật thành công";
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg});
    } catch(error) {
        console.log(error);
    }
}
module.exports = {
    getUserInformation,
    updateUserInformation,
}