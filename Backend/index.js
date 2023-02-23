const express = require('express')
const app = express()

app.get('/hello', (req, res) =>{
    res.send('Hello World')
})
app.listen(2000, ()=>{
    console.log('Server is running on port 2000.');
})