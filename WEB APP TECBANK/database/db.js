const mysql = require('mysql');
//cone con la bd en mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tecbank'
});
//realiza la cone
connection.connect((error) => {
    if(error){
        console.log(error);
    }else{
        console.log("conectado a tecbank :)");
    }
});

module.exports = connection;