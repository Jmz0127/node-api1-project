// BUILD YOUR SERVER HERE

//import express from 'express' in ES6
const express = require('express');
const User = require('./users/model.js');

//instance of express app
const server = express();

//need our global middleware!!
server.use(express.json()); //this parses json from the requests

//endpoints

//GET api/users (fetch all users)
server.get('/api/users', (req, res) => {
	User.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error getting users' });
		});
});

//catch all statement put after all of the other requests
server.use('*', (req, res) => {
	res.status(404).json({
		message: 'not found'
	});
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
