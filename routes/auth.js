const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/auth', authController.getAllAdmins);

router.post('/auth', authController.addAdmin);

module.exports = router;
