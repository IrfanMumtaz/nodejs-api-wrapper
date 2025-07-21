const express = require('express');
const HomeController = require(`${__src}/controllers/HomeController`);
const router = express.Router();

const homeController = new HomeController();

router.get('/sample', (req, res) => homeController.getSampleResponse(req, res));

module.exports = router; 