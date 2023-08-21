require('dotenv').config();
const express = require('express');
const { Router } = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
const router = Router();
const port = 5000

//Middleware 
app.use(express.json());
//Enable to send x-www-form-urlencoded via postman
// app.use(express.urlencoded({extended: false}))
app.use('/api/', router);

mongoose.
connect(process.env.MONGO)
.then(() => {
    console.log("Connected to Mongodb!")
    app.listen(port, () => {
        console.log(`Port is listening on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
});

//REGISTER USER
app.post('/api/auth/register', async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({message: "User has been created"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//GET ALL USERS
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  });

  //GET USER
  app.get('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  });

  //UPDATE A USER
  app.put('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user){
            return res.status(404).json({message: `Can not find user with ID: ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  });

  //DELETE A USER
  app.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user){
            return res.status(404).json({message: `Can not find user with ID: ${id}`})
        }
        res.status(200).json({message: `The deleted user is ${user}`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
  });



module.exports.handler = serverless(app);