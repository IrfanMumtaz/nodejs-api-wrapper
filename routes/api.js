const express = require('express');
const HomeController = require(`${__src}/controllers/HomeController`);
const router = express.Router();

const homeController = new HomeController();

router.get('/collection', (req, res) => homeController.getCollectionResponse(req, res));
router.get('/single', (req, res) => homeController.getSingleResponse(req, res));
router.get('/error', (req, res) => homeController.getErrorResponse(req, res));

module.exports = router; 