const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const Role = require('../models/role.model');
const getUserInformation = async (req, res, next) => {
    try {
        let userId = req.cookies.user.user_id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        let role;
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        const userInfor = await User.find({_id: userId});
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, role});
    } catch(error) {
        console.log(error);
        //res.status(203).render('error')
    }
}
const updateUserInformation = async (req, res, next) => {
    try {
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
const updatePassword = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        const userInfor = await User.find({_id: userId});
        const oldPassword = req.body.oldPassword;
        const validPassword = await bcrypt.compare(
            oldPassword,
            userInfor.password
        );
        if(!validPassword) {
            const msg = "Mật khẩu cũ không đúng";
            res.status(203).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg});
        } else {
            const msg = "Thay đổi mật khẩu thành công";
            res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg});
        }
    } catch(error) {
        console.log(error);
    }
}
const showOtherPeopleInfor = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        const id = req.params.id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        const userInfor = await User.findOne({_id: id});
        let role;
        if(user) {
            console.log('Chạy vào đây hay không?')
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        console.log('in4: ', userInfor)
        let startDate = userInfor.createdAt.toLocaleDateString("en-US");
        console.log(startDate);
        res.status(200).render("otherPeopleInformation", {title: 'Dream boarding house', user, userInfor, startDate, role})
    } catch(error) {
        console.log(error);
    }
}
module.exports = {
    getUserInformation,
    updateUserInformation,
    updatePassword,
    showOtherPeopleInfor,
}