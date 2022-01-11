// BUILD YOUR SERVER HERE

//import express from 'express' in ES6
const express = require('express');
const res = require('express/lib/response');
const { restart } = require('nodemon');
const User = require('./users/model.js');

//instance of express app
const server = express();

//need our global middleware!!
server.use(express.json()); //this parses json from the requests. need to do this when were adding things to the body

//endpoints

//POST api/users Creates a user using the information sent inside the request body
server.post('/api/users', (req, res) => {
	const user = req.body;
	if (!user.name || !user.bio) {
		res.status(400).json({
			message: 'Please provide name and bio for the user'
		});
	} else {
		User.insert(user)
			.then((createdUser) => {
				res.status(201).json(createdUser);
			})
			.catch((err) => {
				res.status(500).json({
					message: 'error creating user',
					err: err.message
					//can also add stack: err.stack on this line to show you where the error is happening, if there are any errors that is
				});
			});
	}
});

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

//Delete api/users/:id Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
	try {
		const possibleUser = await User.findById(req.params.id);
		if (!possibleUser) {
			res.status(404).json({
				message: 'not The user with the specified ID does not exist'
			});
		} else {
			const deletedUser = await User.remove(req.params.id);
			res.status(200).json(deletedUser);
		}
	} catch (err) {
		res.status(500).json({
			message: 'error deleting user',
			err: err.message
			//can also add stack: err.stack on this line to show you where the error is happening, if there are any errors that is
		});
	}
});

//Put  api/users/:id Updates the user with the specified id using data from the request body. Returns the modified user
server.put('/api/users/:id', async (req, res) => {
	try {
		const possibleUser = await User.findById(req.params.id);
		if (!possibleUser) {
			res.status(404).json({
				message: 'The user with the specified ID does not exist'
			});
		} else {
			if (!req.body.name || !req.body.bio) {
				res.status(400).json({
					message: 'Please provide name and bio for the user'
				});
			} else {
				const updatedUser = await User.update(req.params.id, req.body);
				res.status(200).json(updatedUser);
			}
		}
	} catch (err) {
		res.status(500).json({
			message: 'error updating user',
			err: err.message
			//can also add stack: err.stack on this line to show you where the error is happening, if there are any errors that is
		});
	}
});

//catch all statement put after all of the other requests
server.use('*', (req, res) => {
	res.status(404).json({
		message: 'not found'
	});
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
