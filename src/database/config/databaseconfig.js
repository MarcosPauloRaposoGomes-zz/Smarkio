const Sequelize = require('sequelize')

//Database
    //Config Connection
    const sequelize = new Sequelize('smarkio','root','admin',{
        host: "localhost",
        dialect: 'mysql'
    })

    //Checking the connection
    sequelize.authenticate().then(function(){
        console.log("Conectado com sucesso!")
    }).catch(function(erro){
        console.log("Erro ao se conectar: "+erro)
    })

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }