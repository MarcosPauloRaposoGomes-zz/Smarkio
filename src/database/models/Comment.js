const db = require('../config/databaseconfig')

   //Creating table
    const Comment = db.sequelize.define('comentarios',{
        comment: {
            type: db.Sequelize.TEXT
        }
    })

    //Only in the first build
    //Comment.sync({force:true})

    module.exports = Comment