const router = require('express').Router()
const Article= require('../models/article')
//article is the model we created

router.post('/', async (req,res)=>{
  const article = new Article({
    title:req.body.title,
    body: req.body.body,
    author: req.body.author
  })
//above formed is a document
//save it
/*  article.save().then(document=>{
    res.status(201).json(document)
  }).catch(err=>{
    throw err
  })*/

  //ASYNC AWAIT METHOD
  try{
    const document= await article.save()
    return res.status(201).json(document)
  }catch(err){
    throw err
  }

//above both method can be used

})

router.get('/:id', (req,res)=>{
  const id=req.params.id
  //fi we find the id in database then return doc.
  Article.findOne({_id: id},(err,document)=>{
    if(err){
      throw err
    }
    if(document){
      return res.json(document)
    }
    else{
      return res.status(404).json({error:'article not found'})
    }
  })
})


router.patch('/:id', (req,res)=>{
  const id=req.params.id
  //fi we find the id in database then return doc.
  const {title,body,author}= req.body;
  Article.findOne({_id: id},(err,document)=>{
    if(err){
      throw err
    }
    if(document){
      //updating with the values we provide in json
      Article.updateOne({_id: id},
        {
          title,body,author
        }).then(status=>{
          return res.json(req.body)
        }).catch(err=>{
          throw err
        })
    }
    else{
      return res.status(404).json({error:'article not found'})
    }
  })
})

//display all the schemas
router.get('/',(req,res)=>{
  Article.find((err,articles)=>{
    if(err){
      throw err
    }
    if(articles){
      return res.json(articles)
    }
  })
})
//DELETE REQUEST
router.delete('/:id', (req,res)=>{
  const id=req.params.id
  //fi we find the id in database then return doc.
  Article.deleteOne({_id: id}).then((status)=>{
    //returning the id that is deleted
    return res.json({ids:id})
  }).catch(err=>{
    return res.status(500).json({error:'something went wrong'})
  })
})
module.exports= router
//so that this file can be fetched in other files

