// BUILD YOUR SERVER HERE

//import express from 'express' in ES6
const express = require('express');

//instance of express app
const server = express();

//need our global middleware!!
server.use(express.json()); //this parses json from the requests

//endpoints

module.exports = server; // EXPORT YOUR SERVER instead of {}
