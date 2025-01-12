const express = require('express');

const userRouter = express.Router();

const userController = require('../controller/userController');

userRouter.route('/')
.get(userController.getAllUsers);

userRouter.route('/signup')
.post(userController.signup);

userRouter.route('/login')
.post(userController.login);

userRouter.route('/route')
.get(userController.getRoutes);

userRouter.route('/pois')
.get(userController.pointOfInterest);

userRouter.route('/trip')
.post(userController.verifyToken,userController.addTrip)
.get(userController.verifyToken,userController.getAllTrips);

module.exports = userRouter;