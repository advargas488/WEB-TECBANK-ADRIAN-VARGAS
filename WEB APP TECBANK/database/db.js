const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tecbank'
});

connection.connect((error) => {
    if(error){
        console.log(error);
    }else{
        console.log("conectado a tecbank :)");
    }
});

module.exports = connection;