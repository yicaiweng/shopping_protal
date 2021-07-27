const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'wengyicai0909',
    database: 'shopping_portal'
});

app.get('/listofitems', (req, res) => {
    const sqlSelect = 'SELECT * FROM items';
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log('runing on port 3001');
})