//https://www.youtube.com/watch?v=WfCJ3sHnLBM
const Joi =require('joi')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())

app.use(express.json())

const courses=  [
    {id:1, name:'Day of jackal'},
    {id:2, name:'Star wars'},
    {id:3, name:'Death Wish'}
]
app.get('/', function (req, res) {
  res.send('hello world and india')
})

app.get('/api/courses', function (req, res) {
    res.send({courses})
  })
  app.get('/api/courses/:id', function (req, res) {
    const result = courses.find(c=>c.id===parseInt(req.params.id))
    if(!result) res.status(404).send('Course id not found')
   res.send(result.name + result.id)
  })

  app.get('/api/courses/:id/:name', function(req,res){
      res.send(req.query)
  })

  //post request
app.post('/api/courses', function(req,res){
    const schema = Joi.object({
        name: Joi.string()
           .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(3)
        .required()
        })

   const result=   schema.validate({ name: req.body.name });
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }
     
        const course={
            id:courses.length+1,
            name: req.body.name
          
        }
        courses.push(course)
        res.send(course)
    
    
    
})

app.put('/api/courses/:id', function(req,res){
    const course = courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) 
    {res.status(404).send('Course id not found')
        res.send(result.name + result.id)
        return 
    }   
   

    const schema = Joi.object({
        name: Joi.string()
           .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(3)
        .required()
        })

     const result=   schema.validate({ name: req.body.name });
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }
    course.name=req.body.name
    res.send(course)
})
//environment PORT
const port = process.env.PORT || 3000
app.listen(port, console.log(`started application on ${port}`))