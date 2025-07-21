const express = require('express');
const Validation = require(`${__src}/middlewares/ValidationMiddleware`);
const router = express.Router();

const HomeController = require(`${__src}/controllers/HomeController`);
const UserRequest = require(`${__src}/requests/UserRequest`);

const homeController = new HomeController();

router.get('/collection', (req, res) => homeController.getCollectionResponse(req, res));
router.post('/single', Validation.validate(UserRequest), (req, res) => homeController.getSingleResponse(req, res));
router.get('/error', (req, res) => homeController.getErrorResponse(req, res));

module.exports = router; 