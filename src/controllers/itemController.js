const itemModel = require("../Models/itemModel")
const validator = require("../utils/validator")

const createItem = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "request body can't be empty, BAD REQUEST"
            })
        }

        let { name, price, description } = data

        if (!validator.isValid(name)) {
            return res.status(400).send({
                status: false,
                msg: "name is required"
            })
        }

        if (!validator.isValid(price)) {
            return res.status(400).send({
                status: false,
                msg: "price is required"
            })
        }

        if (!validator.isValid(description)) {
            return res.status(400).send({
                status: false,
                msg: "rate is required"
            })
        }

        let isnameAlreadyUsed = await itemModel.findOne({ name })
        if (isnameAlreadyUsed) {
            return res.status(400).send({
                status: false,
                msg: `this ${name} already exist please enter another name`
            })
        }


        let dataToBeCreated = { name, price, description }
        let itemData = await itemModel.create(dataToBeCreated)
        return res.status(201).send({
            status: true,
            msg: "item created successfully",
            data: itemData
        })

    }
    catch (error) {
        console.log(error)
        return res.send({ msg: error.message })
    }
}



module.exports = { createItem }