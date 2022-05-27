const db = require('../database/db');

class User{

    constructor0(id ,name, surname, ced, email, user, pass){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.ced = ced;
        this.email = email;
        this.user = user;
        this.pass = pass;
    }

    login(user, pass){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE user = ? AND pass = ?', [user, pass], function (err, result, fields) {
                if(err) reject(err);
                resolve(result);
            });
        }).then((result) => {
            if(!result[0]){
                return false;
            }
            this.id = result[0].iduser;
            this.name = result[0].name;
            this.surname = result[0].surname;
            this.email = result[0].email;
            this.ced = result[0].cedula;
            this.user = result[0].user;
            this.pass = result[0].pass;
            return true;
        });
    }
    
    register(name, surname, email, ced, user, pass){
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO user (name, surname, email, cedula, user, pass) VALUES (?);", [[name, surname, email, ced, user, pass]], 
            function (err, result, fields) {
                if(err) reject(err);
                resolve(result);
            });
        }).then((result) => {
            if(!result[0]){
                return false;
            }
            return true;
        });
    }
    
    getAccounts(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM account WHERE idUser = ?', [this.id], function (err, result, fields) {
                if(err) reject(err);
                resolve(result);
            });
        }).then((result) => {
            return result;
        });
    }

    getEmail(){
        return this.email;
    }
}


module.exports = User;