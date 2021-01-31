const express = require("express")
const app = express()

const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const Comment = require('./database/models/Comment')

//IBM Watson
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
    //
    const fs = require('fs')
    const shell = require('shelljs');

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
            res.render('commentsList', {comments: comments})
        })
    })

    //Insert Comment Route
    app.get('/', function(req, res){
        res.render('insertComment')
    })

    //Comment Registered Successfully Route
    app.post('/', function(req, res){
        Comment.create({
            comment: req.body.comment
        }).then(function(){
            res.send("Comentário Criado!")
        }).catch(function(erro){
            res.send("Erro ao cadastrar comentário: "+erro)
        })
    })

    //IBM Watson

        //Authenticate 
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({
            apikey: '{}',
            }),
            serviceUrl: '{}',
            disableSslVerification: true,//Desabilidando SSL por estar sendo executado no localhost?
        });

        //Speak Function
        function speek(comment, id){
            const synthesizeParams = {
                text: req.body.comment,
                accept: 'audio/wav',
                voice: 'pt-BR_IsabelaV3Voice',
            };

            textToSpeech.synthesize(synthesizeParams)
            .then(response => {
              // only necessary for wav formats,
              // otherwise `response.result` can be directly piped to a file
              return textToSpeech.repairWavHeaderStream(response.result);
            })
            .then(buffer => {
              fs.writeFileSync(id+'.wav', buffer);//Tem que substituir o hello_world pelo id do comentário para ficar 'id.wav'
            })
            .catch(err => {
              console.log('error:', err);
            });

            () =>{
                const playSong = shell.exec('play '+id+'.wav', {silent: true}).output
            }
        }

      
    
    //Port Connection
    app.listen(8888, function(req, res){
        console.log("Servidor rodando na porta http://localhost:8888")
    })