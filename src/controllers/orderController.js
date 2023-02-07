const itemModel = require("../Models/itemModel")
const orderModel = require("../Models/orderModel")
const userModel = require("../Models/userModel")
const validator = require("../utils/validator")

const createOrder = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "request body can't be empty, BAD REQUEST"
            })
        }

        let userDetails = await userModel.findOne({ _id: userId })
        if (!userDetails) {
            return res.status(404).send({
                status: false,
                msg: "user not found"
            })
        }

        let { items } = data;
        for (let i = 0; i < items.length; i++) {
            let itemId = items[i].itemId;
            let isItemAvailable = await itemModel.find({ _id: itemId });
            if (!isItemAvailable.length) {
                return res.status(400).send({ status: false, msg: `item ${itemId} is not available` })
            }
        }

        let totalQuantity = 0; itemTotal = 0; totalAmount = 0

        for (let i = 0; i < items.length; i++) {
            let quantity = items[i].quantity;;
            totalQuantity += items[i].quantity;
            itemTotal = items.length;
            let itemId = items[i].itemId;

            let itemDetails = await itemModel.findOne({ _id: itemId });
            if (!itemDetails) {
                return res.status(404).send({ status: false, msg: " item is not present" })
            }

            totalAmount += (itemDetails.price) * quantity;
        }

        let dataToBeCreated = { items: items, subTotal: totalAmount, totalItems: itemTotal, totalQuantity: totalQuantity, phone: userDetails.phone, userId: userDetails._id}
        let orderData = await orderModel.create(dataToBeCreated);
        return res.status(201).send({
            status: true,
            msg: "order created successfully",
            data: orderData
        })



    }
    catch (error) {
        console.log(error)
        return res.send({ msg: error.message })
    }
}

const getOrders = async function (req, res) {
    try {
        let userId = req.params.userId
        let getAllOrders = await orderModel.findOne({ userId })
        res.send(getAllOrders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: error.message
        })
    }
}



module.exports = { createOrder, getOrders }