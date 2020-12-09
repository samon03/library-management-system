const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/users', authController.getAllUsers);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.get('/logout', authController.logout);



module.exports = router;
