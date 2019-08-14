const axios = require('axios');
const Dev = require('../Model/Dev');

module.exports = {

    async index(req, res){
        const {user} = req.headers;
        
        const loggeUser = await  Dev.findById(user);

        const users = await Dev.find({
            $and: [
                {_id: {$ne: user}},
                {_id: {$nin: loggeUser.likes}},
                {_id: {$nin: loggeUser.dislikes}},
            ],
        })

        return res.json(users);
    },

    async store(req, res){
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username});

        if (userExists){
            return res.json(userExists);
        }
        
        const response = await axios.get(`http://api.github.com/users/${username}`);

        const {name, bio, avatar_url: avatar} = response.data;
        
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
        return res.json(dev);
    }
};