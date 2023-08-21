import { Post, User } from "./models";
const express = require('express')
const mongoose = require('mongoose')

const app = express();
var database;

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://eliezerperl:irock2009@cluster0.7ytry54.mongodb.net/?retryWrites=true&w=majority") 
        console.log("Connected to Mongodb!")
        console.log(User, Post)
    } catch (error) {
        console.error(error)
    }
}

connect();

app.get('/', (req, res) => {
    const data
    res.send("Welcome to MongoClient");
})

app.listen(8080, async () => {
    console.log('App is running on port 8080')
})