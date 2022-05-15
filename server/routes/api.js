const express = require('express')
const router = express.Router()
const mysql  =  require('mysql')
const { NULL } = require('mysql/lib/protocol/constants/types')
const bcrypt = require("bcrypt")

const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'julesbubu',
  database : 'db_tp5'
})

db.connect(function(err){
  if(err) throw err;
  console.log("connecter a la base")
})

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.books = []
  }
}



router.post('/inscription', async (req,res) =>{
  
  const email = req.body.email
  const password = req.body.password
  const hash = await bcrypt.hash(password, 10);
  const inscript = [[
    req.body.email,
    hash,
    'user',
    req.body.name,
    req.body.surname
  ]]
    db.query("SELECT email FROM user WHERE email = ? ",[email], (err, result) => {
      if (err ) throw err;
      //console.log(result[0].email)
      console.log(result)
      console.log(result.length)
      if(result.length == 0){
        db.query("INSERT INTO user (email, password, actif, name, surname) values ? ", [inscript],(err, result, fields) => {
        console.log("le compte a bien été creer");
        if (err) throw err
      })
      }
      else{console.log("le compte existe deja ")}
      
    })
    res.status(200).json("ok")
  })
  
  

router.post("/connexion", async (req, res) =>{

  const password = req.body.password;
  const email = req.body.email;

  if(typeof email !== 'string' || typeof password !== 'string' || email === '' || password === ''){
    res.status(400).json({message : 'Vérifier les informations que vous avez saisies.'});
    return
  }
  let promiseQuery = new Promise(async (resolve, reject ) =>{
    console.log(email);
    var emailConnexion = [[email]];
    db.query('SELECT * FROM user WHERE email = ? ', [emailConnexion], async (err, res) => {
      console.log(res);
      if (err) reject(err);
      else{
          if(res.length <= 0){
            reject()
          }else{
            let cryptPassword = res[0].password;
            let samePAssword = await bcrypt.compare(password, cryptPassword);
            if(samePAssword){
              
              resolve({
                id : res[0].id_user,
                email: res[0].email,
                name : res[0].name,
                surname : res[0].surname,
                actif : res[0].actif
              });
            }else{
              reject();
            }
          } 
      }
    })
  })

    try{
      let requete = await promiseQuery;
      req.session.userId = requete.id;
      let response = {}
      response.data = requete;
       res.json(response)
    }catch (err){
      console.log(err)
      res.status(401).json({
        message : err
      })
    }
  })

router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})
router.get('/books', (req, res) => {
  try {
    db.query("SELECT * FROM book", (err, result) => {
      res.json(result)
    })
  }
  catch(err){
    console.log("network error", err)
  }
})

router.post('/books', (req, res) => {
  const idbooks = parseInt(req.body.idbooks)
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const availlability = parseInt(req.body.availlability)
  const author = req.body.author

  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ){
    res.status(400).json({ message: 'bad request' })
    return
  }

  var records = [
    [name, description, image, availlability, author]
  ];

  console.log(records)

  try {
    db.query("INSERT INTO book (name, description, image, availlability, author) values ?", [records],(err, result, fields) => {
      if (err) throw err
    
      console.log('result ' +result);
      res.json('OK')
      })
    

  }
  catch(err){
    console.log("network error", err)
  }
})

router.get('/livres/recherche/:nomLivreRecherche', async(req, res) => {
  var titreCherche = req.params.nomLivreRecherche
  db.query("SELECT * FROM book WHERE name LIKE '%" + titreCherche +"%'", function (err, result){
    if(err) throw err;
    res.json(result)
  })
})


module.exports = router
