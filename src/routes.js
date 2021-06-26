const express = require('express');

const routes = express.Router();

const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')


routes.get('/', (req, res) => res.render('index', {page: 'enter-room'}));
routes.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}));
routes.get('/not-found', (req, res) => res.render('index', {page: 'not-found'}));
routes.post('/enter-room', roomController.enter)


// Sending info from the modal form to the server
routes.post('/create-room', roomController.create);
routes.get('/room/:room', roomController.open);

// Questions controller
routes.post('/question/create/:room', questionController.create)
routes.post('/question/:room/:question/:action', questionController.index);




module.exports = routes