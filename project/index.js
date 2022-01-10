const { response } = require('express');
var bodyParser = require('body-parser');
const sql = require('mysql');// import msql
const express = require('express'); //imi importa express-ul
const req = require('express/lib/request');
const app = express();
const parseUrlencoded = bodyParser.urlencoded({ extended: false }); // ca sa imi decodeze din req.body in json

//create db connection
const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bakery'

});

//connect db 
db.connect((err) => {
    if (err)
        throw err;
    console.log('MySql Connected...');

})


//---------------Routes----------------------------
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html')//ii trimit un fisier ca response
})

app.get('/db', (req, res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    })

});

app.delete('/delete/:id', (req, res) => {
    console.log('Got a DELETE request');
    const { id } = req.params;
    var sql = `DELETE FROM products WHERE name = "${id}"`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("It was deleted " + id);
    });

    res.status(201).send("Object deleted");
});

app.post('/insert', parseUrlencoded, (req, res) => {
    const product = req.body;
    const { name } = product;
    const { description } = product;
    const { url } = product;
    const { price } = product;
    console.log(product);
    var sql = `INSERT INTO products (name, description, price,url) VALUES ('${name}', '${description}','${price}','${url}')`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.status(201).json(product);

})

app.put('/update/:updateProduct', parseUrlencoded, (req, res) => {
    var { name } = req.query;
    var { description } = req.query;
    var { url } = req.query;
    var { price } = req.query;
    var { updateProduct } = req.params;
    name = name.substring(1, name.length - 1);
    description = description.substring(1, description.length - 1);
    url = url.substring(1, url.length - 1);
    price = price.substring(1, price.length - 1);
    var sql = `UPDATE products SET name = '${name}',description = '${description}',url ='${url}',price ='${price}' WHERE name = '${updateProduct}'`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Produsul a fost actualizat");
        res.status(201).send(result);
    });
    
})


app.use(express.static('public'));// serverul raspunde cu tot ce e in public la request de pe general

app.listen(3000, () => {
    console.log('Server started on port 3000');//sa ma asigur ca e pornit
})

