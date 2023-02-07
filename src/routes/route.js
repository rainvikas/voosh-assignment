const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const itemController = require("../controllers/itemController")
const orderController = require("../controllers/orderController")
const mid = require("../middlewares/auth")

router.post("/add-user", userController.createUser)
router.post("/login-user", userController.loginUser)

router.post("/createitem", itemController.createItem)

router.post("/add-order/:userId", mid.authentication, orderController.createOrder)
router.get("/get-order/:userId", mid.authentication, mid.authorization, orderController.getOrders)


module.exports = router;