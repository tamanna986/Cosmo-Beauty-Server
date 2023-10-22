const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// cosmoBeauty
// iPJxUWXT0vNogto4




const uri = "mongodb+srv://cosmoBeauty:iPJxUWXT0vNogto4@cluster0.cuu4rc1.mongodb.net/?retryWrites=true&w=majority";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cuu4rc1.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('productDB').collection('product');
    const brandCollection = client.db('productDB').collection('brands');
    const cartCollection = client.db('productDB').collection('carts');

    // to get brand names and logo in home page
    app.get('/brands', async(req, res) =>{
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    // to get products Products By Brand 
    app.get('/products/:brandName', async (req, res) => {
        const brandName = req.params.brandName;
        const cursor = productCollection.find({ brandName: brandName });
        const result = await cursor.toArray();
        res.send(result);
    });
  
    // to go to a specific products detail route
    app.get('/product/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        res.send(result);
    });
 
    // to go to a specific products update route
    app.get('/products/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        res.send(result);
    });
 
    
    
    

    

  

    // for adding products

    app.post('/product', async(req, res) =>{
        const newProduct = req.body;
        console.log(newProduct)
        const result = await productCollection.insertOne(newProduct)
        res.send(result);
    })
    // for adding brand name and brand logo
    app.post('/brands', async(req, res) =>{
        const newBrand = req.body;
        console.log(newBrand)
        const result2 = await brandCollection.insertOne(newBrand)
        res.send(result2);
    })

 // for adding cart items

 app.post('/myCart', async(req, res) =>{
  const newCart = req.body;
  console.log(newCart)
  const result = await cartCollection.insertOne(newCart)
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req,res) =>{
    res.send('cosmo beauty server is running')
})

app.listen(port, () => {
    console.log(`cosmo beauty server is running on port ${port}`)
})