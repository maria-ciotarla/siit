const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ extended: false}); // ca sa imi decodeze din req.body in json
var blocks = [{
    id: 'Fixed',
    description: 'Fastened securely'
},
{
    id: 'Movable',
    description: 'capable'
},
{
    id: 'Rotating',
    description: 'circle'
}];
//list
router.get('/', (req, res) => {
    //res.send('<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>')
    res.json(blocks);

})
//4Rute parametrizate

//Read
router.get('/:id', (req, res) => {
    const {id} = req.params;// cand am chemat server ul cu ruta respectiva ne extragem parametrul
    //const {type} = req.query;

    console.log(req.query);
    const block_filtered=blocks.filter(block => block.id === id)[0];
    //res.send('<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>')
    if(!block_filtered){
        res.status(404).json("No block found"+block_filtered.id);
    }
    res.json(block_filtered);

})

//POST METHOD or create
router.post('/',parseUrlencoded,(req,res)=>{
    const newBlock = req.body;
    res.status(201).json(newBlock);
    blocks.push(newBlock);
})
//update
/*router.put('/:id',parseUrlencoded,(req,res)=>{
    const newBlock = req.body;
    res.status(201).json(newBlock);
    blocks.push(newBlock);
})*/
router.delete('/:id', (req, res) => {
    console.log('Got a DELETE request at /user');
    const {id} = req.params;
    filteredBlocks = blocks.filter(block => block.id != id);
    blocks=filteredBlocks;
    res.status(201).json(blocks);
});
router.put('/:id', parseUrlencoded,(req, res)=>{
    var {id} = req.params;
    var lastId=id;
    var {id}=req.query;
    var {description}=req.query;
    
    blocks.map(block => {
        if(block.id==lastId){
            block.id=id;
            block.id=id.substring(1, id.length-1);
            block.description=description.substring(1, id.length-1);
        }


    });
    res.json(blocks);
});

module.exports = router;


