const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const itemModel = require('./models/Item')

app.use(cors());
app.use(express.json());
dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => {
    console.log('Connected to MongoDB');
});

// app.get('/', async (req, res) => {
//     const item = new itemModel({ id: 1, itemName: 'T-Shirt', itemPrice: 7.99, itemImg: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw2MzUxNnwwfDF8c2VhcmNofDh8fHNoaXJ0fGVufDB8fHx8MTYyNzM1NTU4NQ&ixlib=rb-1.2.1&q=80&w=1080";0', quantity: 0 })

//     try {
//         await item.save();
//     } catch (err) {
//         console.log(err);
//     }
// })

app.get('/listofitems', async (req, res) => {
    itemModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log('runing on port 3001');
})