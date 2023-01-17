const express = require('express');
const app= express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vba6qse.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const blogCollection = client.db('blogDatabase').collection("blogs");

        app.get('/blogs', async(req, res) =>{
            const query= {};
            const cursor= blogCollection.find(query)
            const blog= await cursor.toArray();
            res.send(blog);
        })


        app.get('/blog/:id', async(req,res) =>{
            id=req.params.id;
            const query ={_id: ObjectId(id)};
            const blog= await blogCollection.findOne(query);
            res.send(blog)
        })
    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/',(req , res)=>{
    res.send("Server is running")
})

app.listen(port ,() =>{
    console.log(`Server running on ${port}`)
})