const mongoose = require('mongoose')

const ItemScheme = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemImg: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Item = mongoose.model('Item', ItemScheme);
module.exports = Item;