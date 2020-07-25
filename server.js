const express = require('express')
const app= express()
const mongoose= require('mongoose')

//CREATING SERVER
const port= process.env.Port || 3000;
//when hosted then random port is assigned 
// so to check if 3000 is available we use
//process.env.Port


//DATABASE CONNECTION
const url='mongodb://localhost/node-api'
mongoose.connect(url,{
  useNewUrlParser:true,
  useCreateIndex:true, 
  useUnifiedTopology:true,
  useFindAndModify:true
})
//above connecton is formed b/w compass and file

const connecton=mongoose.connection

//to check if database is connected we can use the event
connecton.once('open', ()=>{
  console.log('database connected')
}).catch((err)=>{
  console.log('databse error');
})


app.use(express.json());

//fetch routes file
const articlesRoutes= require('./routes/articles')
//articlesRoutes contains all the routes
app.use('/api/articles', articlesRoutes)
//now articlesRoutes containes only that routes whose 
//prefix is /api/articles


//second parameter for port is function
app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})