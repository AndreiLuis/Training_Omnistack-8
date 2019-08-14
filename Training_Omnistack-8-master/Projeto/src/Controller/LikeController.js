const Dev = require('../Model/Dev');
module.exports = {
    async store(req, res)
    {
        console.log(req.params.devId);
        console.log(req.headers.user);

        const {devId} = req.params;
        const {user} = req.headers;

        const loggedUser = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);
    if(!targetDev){
        return res.status(400).json({error: 'Dev not exists'})
    }

    if(targetDev.likes.include(loggedUser._id)){
        console.log('É.. acho q deu MATCH')
    }

    loggedUser.likes.push(targetDev._id);
        //return res.json({ok:true}); //teste método do controller
        return res.json(loggedUser);
    }
}; 