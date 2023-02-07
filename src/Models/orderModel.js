const mongoose = require('mongoose')
ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    items: [{
        itemId: { type: ObjectId, refs: "item", required: true, trim: true },

        quantity: { type: Number, required: true, min: 1 },
        _id: false
    }],

    subTotal: { type: Number, required: true, trim: true },

    totalItems: { type: Number, required: true, trim: true },

    totalQuantity: { type: Number, required: true, trim: true },


    phone: {
        type: String, required: true, trim: true,
        match: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
    },

    userId: { type: ObjectId, refs: "user", required: true, trim: true },

    deletedAt: { type: Date, default: null },

    isDeleted: { type: Boolean, default: false },

}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)