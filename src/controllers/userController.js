const userModel = require("../Models/userModel")
const validator = require("../utils/validator")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
let saltRounds = 10



const createUser = async function (req, res) {
    try {
        let data = req.body
        // let Data = JSON.parse(data)

        let { fname, lname, phone, password } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "request body can't be empty, BAD REQUEST"
            })
        }

        if (!validator.isValid(fname)) {
            return res.status(400).send({
                status: false,
                msg: "fname is required"
            })
        }

        if (!validator.isValid(lname)) {
            return res.status(400).send({
                status: false,
                msg: "lname is required"
            })
        }

        if (!validator.isValid(phone)) {
            return res.status(400).send({
                status: false,
                msg: "phone is required"
            })
        }

        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone))) {
            return res.status(400).send({
                status: false,
                msg: "phone number is not valid please enter max 10 digit you can include +91,0,91 before 10 digit no"
            })
        }

        let isPhoneAlreadyUsed = await userModel.findOne({ phone })
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({
                status: false,
                msg: "this phone no. already exist please enter another phone no."
            })
        }


        if (!validator.isValid(password)) {
            return res.status(400).send({
                status: false,
                msg: "passsword is required"
            })
        }

        if (password.length < 8 || password.length > 16) {
            return res.status(400).send({
                status: false,
                msg: "password should be min 8 and max 16"
            })
        }

        let hash = bcrypt.hashSync(password.toString(), saltRounds)
        let dataToBeCreated = { fname, lname, phone, password: hash }
        let userData = await userModel.create(dataToBeCreated)

        return res.status(201).send({
            status: true,
            msg: "user created successfully",
            data: userData
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

const loginUser = async function (req, res) {
    try {
        let data = req.body
        let { phone, password } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "request body can't be empty, BAD REQUEST"
            })
        }

        if (!(validator.isValid(phone) && validator.isValid(password))) {
            return res.status(400).send({
                status: false,
                msg: "phone no. and password both is required"
            })
        }

        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone))) {
            return res.status(400).send({
                status: false,
                msg: "phone number is not valid please enter max 10 digit you can include +91,0,91 before 10 digit no"
            })
        }

        if (password.length < 8 || password.length > 16) {
            return res.status(400).send({
                status: false,
                msg: "password should be min 8 and max 16"
            })
        }

        let User = await userModel.findOne({ phone: phone })
        if (User) {
            const Passwordmatch = bcrypt.compareSync(data.password, User.password)
            if (Passwordmatch) {
                let token = jwt.sign({ userId: User._id , exp : Math.floor(Date.now() / 1000) + (60 * 30) }, "Voosh")
                let details = { token: token }

                return res.status(200).send({
                    status: true,
                    msg: "login is successfull",
                    data: details
                })
            }

            else {
                return res.status(404).send({
                    status: false,
                    msg: "password not found"
                })
            }
        }
        return res.status(404).send({
            status: false,
            msg: "phone no. not found"
        })

    }
    catch (error) {
        console.log("This is the error:", error.message)
        res.status(500).send({ msg: "server error", err: error })
    }

}


module.exports = { createUser, loginUser }