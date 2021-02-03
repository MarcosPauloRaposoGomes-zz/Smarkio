const express = require("express")
const app = express()

const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const Comment = require('./database/models/Comment')

//Config
    //Template Engine
    app.engine('handlebars',handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Body Parser (Receive Forms Datas)
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())


//Servidor Routes

    //Registered Comments
    app.get('/',function(req, res){
        Comment.findAll({order: [['id', 'DESC']]}).then(function(comments){
            res.render('interface', {comments: comments})
        })
    })

    //Insert Comment Route
    app.get('/', function(req, res){
        res.render('interface')
    })

    //Comment Registered Successfully Route
    app.post('/', function(req, res){
        Comment.create({
            comment: req.body.comment
        }).then(function(){
            res.send("Sucesso")
        }).catch(function(erro){
            res.send("Erro ao cadastrar comentário: "+erro)
        })
    })
    
//Static Files
app.use(express.static(path.join(__dirname + '/public/views/layouts')))

//Port Connection
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log("Servidor rodando na porta http://localhost:3000")
})