const express = require('express');
const dotenv = require('dotenv');
const { neon } = require('@neondatabase/serverless');

dotenv.config();

const index = express();

const client = neon(process.env.DB_URL);

index.set('view engine','ejs'); 

index.use(express.static("public"));

index.get('/test' ,(req,res)=>{
    return res.send("ok");
})

index.get("/", async (req,res)=>{
   const data = await client`SELECT * FROM users`;
    res.render("intro");
})

index.get("/signup", async (req,res)=> {
    res.render("signup");
})

index.get("/login", async (req,res)=> {
    res.render("login");
})

index.get("/intro", async (req,res)=> {
    res.render("intro");
})


index.listen(3000,()=> console.log('running on port 3000'));