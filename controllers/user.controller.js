const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const Role = require('../models/role.model');
const FollowInnKeeper = require('../models/followInnKeeper.model');
const RoleService = require('../services/role.service');
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
        console.log('role ne: ', role);
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
        let role;
        role = await Role.findOne({userId: userId});
        role = role.name;
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role});
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
        let role;
        role = await Role.findOne({userId: userId});
        role = role.name;
        if(!validPassword) {
            const msg = "Mật khẩu cũ không đúng";
            res.status(203).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role});
        } else {
            const msg = "Thay đổi mật khẩu thành công";
            res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role});
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
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        let startDate = userInfor.createdAt.toLocaleDateString("en-US");
        console.log(startDate);
        res.status(200).render("otherPeopleInformation", {title: 'Dream boarding house', user, userInfor, startDate, role})
    } catch(error) {
        console.log(error);
    }
}

const followInnKeeper = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        const innkeeperId = req.params.id;
        let followInKeeperBody = {
            userId: userId,
            innKeeperId: innkeeperId,
        }
        const newFollowInnkeeper = FollowInnKeeper(followInKeeperBody);
        await newFollowInnkeeper.save();
        // const userInfor = await User.findOne({_id: userId});
        let role, user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        if(user) {
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        // res.status(200).render("otherPeopleInformation", {title: 'Dream boarding house', user, userInfor, startDate, role})
        res.status(200).json({
            msg: "Follow successfully"
        })

    } catch (error) {
        console.log(error);
    }
}
const getFollowInnkeeper = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        let user, role;
        if(userId) {
            user = req.cookies.user.user_id;
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        const userInfor = await User.findOne({_id: userId});
        const listInkeeperId = await FollowInnKeeper.find({userId: userId});
        let listInnkeeper = [];
        if(listInkeeperId.length > 0) {
            for(let i = 0; i < listInkeeperId.length ; i++) {
                const innkeeper = await User.findOne({_id: listInkeeperId[i].innKeeperId});
                if(innkeeper) {
                    listInnkeeper.push(innkeeper);
                }
            }
        }
        res.status(200).render("listInnkeeper", {title: 'Dream boarding house', user, userInfor, role, listInnkeeper})
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getUserInformation,
    updateUserInformation,
    updatePassword,
    showOtherPeopleInfor,
    followInnKeeper,
    getFollowInnkeeper,
}