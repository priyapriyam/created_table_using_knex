const express = require('express')
let app = express();
app.use(express.json())

const knex=require('knex')({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',
        password:'password',
        database:'Movies'
    }
})
                                                                                                                                                                                                                                                                                                                                                                                                         
//now I post the data in table and it's field
app.post('/post', (req,res) => {
    let data ={                                                                                  
        movie_name:req.body.movie_name,
        movie_year:req.body.movie_year,
        movie_url:req.body.movie_url
    }
    knex('movie').insert(data)
    .then((result )=>{
        console.log(result)
        res.send("data inserted")
    })
    .catch ((err)=>{
        res.send (err)

    })
});


// now I read the data of the table

app.get('/get',(req,res) => {
    knex.select ("*").from('movie')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })

})


// now I update data in table
app.put("/put",(req,res)=>{
    let data = {                                                                                  
        movie_name:req.body.movie_name,
        movie_year:req.body.movie_year,
        movie_url:req.body.movie_url
    }
    knex('movie')
    .where({id : req.body.id})
    .update(data)
    .then((result) => {
        console.log(result)
        res.send("data updated")
    }).catch((err) => {
        res.send(err);
    })
});
app.delete("/delete",(req,res) =>{
    let data = {
        movie_name: req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_url: req.body.movie_url
    }
    knex("movie")
    .where({ id: req.body.id })
    .del(data).then((data) => {
        console.log("del done");
    })
});

app.listen(3000,()=>{
    console.log("connection 3000")
})