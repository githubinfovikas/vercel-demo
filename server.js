import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app  = express();
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');

});

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})