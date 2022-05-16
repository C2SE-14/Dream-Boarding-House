const favoriteRoom = require('../models/favoriteRoom.model');
const Room = require('../models/room.model');
const Role = require('../models/role.model');
const showResultOfSearch = async (req, res, next) => {
    let user = '';
    user = req.cookies.user;
        let userId = '';
        let role = '';
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
    const value = req.body;
    console.log('value: ', value);
    const {text, type, price, acreage} = req.body;
    console.log('text: ', text);
    console.log('type of text: ', typeof(text));
    let listRoom = [];
    console.log(text.includes("0"));
    if(text.includes("0")) {
        console.log('ok');
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("1")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("2")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("3")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("4")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("5")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("6")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("7")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("8")) {
        listRoom = await Room.find({price: text})
    }
    else if(text.includes("9")) {
        listRoom = await Room.find({price: text})
    }
    else {
        listRoom = await Room.find({type: text})
    }
    console.log('list rooom: ', listRoom)
    res.status(200).render("resultSearch", {title: "Dream boarding house", listRoom, user, role});
}
module.exports = {
    showResultOfSearch,
}