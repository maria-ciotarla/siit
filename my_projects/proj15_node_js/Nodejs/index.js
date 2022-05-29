//Node js server
/*const res = require('express/lib/response');
const http =require('http');
const requestListener = function (req,res){
res.writeHead(200, {'Content-Type':'text/html'});//serverul  intoarce continut de tip html 
res.end('Hello, World!');//pune pe content hello world, 200 inseamna status ok 
}
const server = http.createServer(requestListener);
// creaza un server si la fiecare request raspunde cu functia  requestListener
server.listen(3000, ()=>{
    console.log('Server started on port 3000');//acest mesaj va aparea in terminal
});
*/


//Express
//2. npm install--express -> package-lock.json and node_modules
// express e un framework pentru node js
const { response } = require('express');
var bodyParser = require('body-parser');
const express = require('express') //imi importa express-ul
const app = express();
const parseUrlencoded = bodyParser.urlencoded({ extended: false}); // ca sa imi decodeze din req.body in json
const blocksModule= require('./routes/blocksRoute.js');

/*
app.get('/',(req,res)=>{// am facut req de tip get la server de la calea '/' si apoi el raspunde
  
   // res.send('Hello world');
    res.json({success:true,
    message:'hello',
     pagenumber:1})
    // res.sendFile(__dirname+'/public/index.html')//ii trimit un fisier ca response

});*/


//pentru a face debug avem nevoie nodemon(node monitor)
//npm install --save nodemon
//3. middleware function permite niste verificari inainte sa iti raspunda serverul. next permite trecerea la urmatorul midlleware
app.use((req, res, next) => { //arrow function
    console.log(req.query);
    next();
})
app.use(express.static('public'));// serverul raspunde cu tot ce e in public la request de pe general
app.use('/blocks', blocksModule)
app.listen(3000, () => {
    console.log('Server started on port 3000');//sa ma asigur ca e pornit
})

