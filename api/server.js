// BUILD YOUR SERVER HERE

//import express from 'express' in ES6
const express = require('express');
const User = require('./users/model');

//instance of express app
const server = express();

//need our global middleware!!
server.use(express.json()); //this parses json from the requests

//endpoints

//GET api/users (fetch all users)
server.get('/api/users', async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
server.get('/api/users', (req, res) => {
	User.findAll()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
