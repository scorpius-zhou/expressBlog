var Sequelize = require('sequelize');

exports.sequelize = function() {
    return new Sequelize('blog', 'root', 'Yfgreat601ms', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        timezone: '+08:00' //东八时区
    })
}