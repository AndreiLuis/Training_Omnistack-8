
const express = require('express');
const devController = require('./Controller/DevController');
const likeController = require('./Controller/LikeController');
const dislikeController = require('./Controller/DislikeController');
const routes = express.Router();

// routes.get('/', (req, res) =>{
//     return res.json({message: `Olá ${req.query.name}`});
// });

// routes.post('/devs', (req, res) =>{
//     console.log(req.body);
//     return res.json({ok: true});
// });
routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.post('/devs/:devId/likes/', likeController.store);
routes.post('/devs/:devId/dislikes/', dislikeController.store);
module.exports = routes;