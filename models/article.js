const mongoose=require('mongoose')

const Schema= mongoose.Schema

const articleSchema= new Schema({
  title: {type: String ,required:true},
  body: {type: String ,required:true},
  author: {type: String ,required:true}
},{timestamps: true})
//timestamp will show the time of creation

//now we will create model

const Article=mongoose.model('Article',articleSchema)

module.exports=Article