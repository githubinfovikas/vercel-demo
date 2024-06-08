import express from "express";
const app  = express();
const port = 5050;


app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');

});

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})