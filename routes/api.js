const express = require('express');
const Validation = require(`@middlewares/ValidationMiddleware`);
const router = express.Router();

const HomeController = require(`@controllers/HomeController`);
const UserRequest = require(`@requests/UserRequest`);

const homeController = new HomeController();

router.get('/collection', (req, res) => homeController.getCollectionResponse(req, res));
router.post('/single', Validation.validate(UserRequest), (req, res) => homeController.getSingleResponse(req, res));
router.get('/error', (req, res) => homeController.getErrorResponse(req, res));

module.exports = router; 