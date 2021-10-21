const express = require('express');
const app = express();
const PORT = 5000;

const generate_schedule = require('./scheduling.js');


const bakers = [1,2,3]
const orders = {};

const schedule = {}
bakers.forEach(id => schedule[id] = []);


const gen_id = (() => {
    var id = 0;

    return () => {
        const next_id = id;
        id = id + 1;
        return next_id;
    }
})();




app.use(express.json());

app.post('/add',(req,res) => {
    const json = req.body;
    console.log(json);

    const {name,duration} = json;

    if (duration > 8 || duration <= 0){
        res.send(500,'Cannot handle specified duration');
    }else{
        const id = gen_id();
        orders[id] = {name,duration,id}
        res.send({id})
    }


    console.log(orders);
});

app.post('/delete',(req,res) => {
    const json = req.body;
    const {id} = json;

    if (orders[id]){
        delete orders[id];
        console.log(orders);
        res.send(`Deleted order ${id}`);
    }else{
        res.send(500,'Invalid id, nothing to delete');
    }

    res.send();
});


app.get('/schedule',(req,res) => {
    res.send(schedule);
})


app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})

