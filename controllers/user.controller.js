const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const Role = require('../models/role.model');
const FollowInnKeeper = require('../models/followInnKeeper.model');
const Room = require("../models/room.model");
const RoleService = require('../services/role.service');
const getUserInformation = async (req, res, next) => {
    try {
        let userId = req.cookies.user.user_id;
        let user;
        if(userId) {
            user = req.cookies.user.user_id;
        }
        let role, showSearch = "no";
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        const userInfor = await User.find({_id: userId});
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, role, showSearch});
    } catch(error) {
        console.log(error);
        //res.status(203).render('error')
    }
}
const updateUserInformation = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        let user, showSearch = "no";
        if(userId) {
            user = req.cookies.user.user_id;
        }
        const {username, email, phoneNumber} = req.body;
        console.log('user name: ', username);
        console.log(typeof(username));
        if(username === "" && email === "") {
            if(phoneNumber !== "") {
                const body = {
                    phoneNumber: phoneNumber
                }
                await User.where({_id: userId}).update(body);
            }
        } else if(username === "" && phoneNumber === "") {
            if(email !== "") {
                const body = {
                    email: email
                }
                await User.where({_id: userId}).update(body);
            }
        } else if(email === "" && phoneNumber === "") {
            if(username !== "") {
                const body = {
                    username: username
                }
                await User.where({_id: userId}).update(body);
            }
        } else if((username !== "" && email !== "") && phoneNumber !== "") {
            const body = {
                username: username,
                email: email,
                phoneNumber: phoneNumber
            }
            await User.where({_id: userId}).update(body);
        } else if(username !== "" && email !== "") {
            if(phoneNumber ==="") {
                const body = {
                    username: username,
                    email: email,
                }
                await User.where({_id: userId}).update(body);
            }
        } else if(username !== "" && phoneNumber !== "") {
            if(phoneNumber ==="") {
                const body = {
                    username: username,
                    phoneNumber: phoneNumber,
                }
                await User.where({_id: userId}).update(body);
            }
        } else if(email !== "" && phoneNumber !== "") {
            if(username ==="") {
                const body = {
                    phoneNumber: phoneNumber,
                    email: email,
                }
                await User.where({_id: userId}).update(body);
            }
        } 
        const userInfor = await User.find({_id: userId});
        const msg = "Cập nhật thành công";
        let role;
        role = await Role.findOne({userId: userId});
        role = role.name;
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role, showSearch});
    } catch(error) {
        console.log(error);
    }
}
const updateAvatar = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id
        let file = {};
        file = req.file;
        const userAvt = {
            avatar: file.path
        }
        await User.where({_id: userId}).update(userAvt);
        console.log(file);
        let user, showSearch = "no";
        if(userId) {
            user = req.cookies.user.user_id;
        }
        const userInfor = await User.find({_id: userId});
        const msg = "Cập nhật thành công";
        let role;
        role = await Role.findOne({userId: userId});
        role = role.name;
        // res.status(200).json({
        //     msg: "Successfully",
        //     img: file.path,
        // })
        res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role, showSearch});
    } catch (error) {
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
        let role, showSearch = "no";
        role = await Role.findOne({userId: userId});
        role = role.name;
        if(!validPassword) {
            const msg = "Mật khẩu cũ không đúng";
            res.status(203).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role, showSearch});
        } else {
            const msg = "Thay đổi mật khẩu thành công";
            res.status(200).render('userInformation', {title: 'Dream boarding house', userInfor, user, msg, role, showSearch});
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
        let role, showSearch = "no";
        if(user) {
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        let listFollow = [];
        let isFollow = "false";
        listFollow = await FollowInnKeeper.find({userId: userId});
        const listRoom = await Room.find({userId: userInfor.id});
        let total = 0, numberRoom = 0, ratio = 0;
        total = listRoom.length;
        ratio = (numberRoom/total)*100; 
        for(let i = 0; i < listFollow.length; i++) {
            if(listFollow[i].innKeeperId === userInfor.id) {
                isFollow = "true";
            }
        }
        console.log('isFollow: ', isFollow);
        let startDate = userInfor.createdAt.toLocaleDateString("en-US");
        console.log(startDate);
        res.status(200).render("otherPeopleInformation", {title: 'Dream boarding house', user, userInfor, startDate, role, isFollow, total, numberRoom, ratio, listRoom, showSearch})
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
        let user, role, showSearch = "no";
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
        console.log('list innkeeper nè: ', listInnkeeper);
        res.status(200).render("listInnkeeper", {title: 'Dream boarding house', user, userInfor, role, listInnkeeper, showSearch})
    } catch (error) {
        console.log(error);
    }
}
const unFollowInnkeeper = async (req, res, next) => {
    try {
        const innkeeperId = req.params.id;
        await FollowInnKeeper.deleteOne({innkeeperId: innkeeperId});
        res.status(200).json({
            msg: "successfully"
        })
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
    updateAvatar,
    unFollowInnkeeper,
}