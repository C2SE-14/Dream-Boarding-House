const { response } = require('express');
const User = require('../models/user.model');
const getUserInformation = async (req, res, next) => {
    try {
        let userId = req.cookies.user.user_id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        console.log('user: ', user);
        const userInfor = await User.find({_id: userId});
        console.log('userInfor: ', userInfor)
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user});
    } catch(error) {
        console.log(error);
        //res.status(203).render('error')
    }
}
module.exports = {
    getUserInformation,
}