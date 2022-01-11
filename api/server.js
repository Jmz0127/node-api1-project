// BUILD YOUR SERVER HERE

//import express from 'express' in ES6
const express = require('express');
const { restart } = require('nodemon');
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
			res.status(500).json({
				message: 'The users information could not be retrieved',
				err: err.message
				//can also add stack: err.stack on this line to show you where the error is happening, if there are any errors that is
			});
		});
});

//Get api/users/:id (fetch users by an id)
server.get('/api/users/:id', (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				res.status(404).json({
					message: 'The user with the specified ID does not exist'
				});
			}
			res.json(user);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'error getting user',
				err: err.message
				//can also add stack: err.stack on this line to show you where the error is happening, if there are any errors that is
			});
		});
});

//catch all statement put after all of the other requests
server.use('*', (req, res) => {
	res.status(404).json({
		message: 'not found'
	});
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
