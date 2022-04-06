const express = require('express');

const router = express.Router();

const Hero = require('../models/hero.js');

const multer = require('multer');

let filename = '';
const mystorage = multer.diskStorage(
    {
        destination: './upload',
        filename:( req , file , cb )=>{
            let date = Date.now();
            //53453535345.jpg
            // image/png
            // [ 'image', 'png' ]
            let fl = date + '.' + file.mimetype.split('/')[1];
            cb(null, fl);
            filename = fl;
        } 
    }
);

const upload = multer({ storage: mystorage })

// ajout avec upload
router.post( '/create' , upload.any('image') , ( req , res )=>{
    let dataFromPostman = req.body;
    let hero = new Hero( dataFromPostman );
    hero.image = filename;
    hero.save()
          .then(
              (savedHero)=>{
                  filename = '';
                  console.log(savedHero);
                  res.send(savedHero);
              }
          )
          .catch(
              (error)=>{
                  console.log(error);
                  res.send(error)
              }
          )
  } );
  
  //ajout sans upload
  

router.post( '/ajout'  , ( req , res )=>{
    let dataFromPostman = req.body;
    let hero = new Hero( dataFromPostman );
  
    hero.save()
          .then(
              (savedHero)=>{
                 
                  console.log(savedHero);
                  res.send(savedHero);
              }
          )
          .catch(
              (error)=>{
                  console.log(error);
                  res.send(error)
              }
          )
  } );
  
  
  router.get( '/all' , (req, res)=>{
     
      Hero.find()
          .then(
              (allHeros)=>{
                  res.send(allHeros);
              }
          )
          .catch(
              (error)=>{
                  res.send(error);
              }
          )
  
  } )
  

  
  router.get('/getbyid/:id' , (req, res)=>{
  
      let myid = req.params.id;
  
      Hero.findOne({ _id: myid })
                  .then(
                      (art)=>{
                          res.send(art);
                      }
                  )
                  .catch(
                      (err)=>{
                          res.send(err)
                      }
                  )
  
  })
  
  
  router.delete( '/supprimer/:id' , (req , res)=>{
  
       let id = req.params.id;
       
       Hero.findByIdAndDelete( { _id: id } )
          .then(
              (deletedHero)=>{
                  res.send(deletedHero);
              }
          )
          .catch(
              (err)=>{
                  res.send(err);
              }
          )
  
  } )
  
  router.put( '/update/:id' , (req , res)=>{
      let id = req.params.id;
      let newData = req.body;
      Hero.findOneAndUpdate( 
          { _id: id },
          newData
      ) .then(
          (updatedHero)=>{
              res.send(updatedHero)
          }
      )
      .catch(
          (err)=>{
              res.send(err)
          }
  
      )
  } )
  

module.exports = router;