const db = require('../config/databaseconfig')

   //Creating table
    const Comment = db.sequelize.define('comentarios',{
        comment: {
            type: db.Sequelize.TEXT
        }
    })

    //Usar apenas no primeiro build
    Comment.sync({force:true})

    module.exports = Comment