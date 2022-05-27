const db = require('../database/db');

class Account{
    transferenciaIntrabancaria(monto, cuentadestino, cuentaorigen){
        db.query('UPDATE account SET balance = balance + ? WHERE iban = ?;', [monto, cuentadestino], function(err, res){
            if(err){
                console.log(err);
            }
        });
        db.query('UPDATE account SET balance = balance - ? WHERE iban = ?;', [monto, cuentaorigen], function(err, res){
            if(err){
                console.log(err);
            }
        });
    }
    transferenciaInterbancaria(monto, cuentaorigen, tipocambio){
        let suma = 2 * tipocambio;
        monto = parseInt(monto) + suma;
        db.query('UPDATE account SET balance = balance - ? WHERE iban = ?;', [monto, cuentaorigen], function(err, res){
            if(err){
                console.log(err);
            }
        });
    }
}

module.exports = Account;