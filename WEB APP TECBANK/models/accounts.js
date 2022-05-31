const db = require('../database/db');
//clase cueta
class Account{
    //realiza los cambios en la bd luego de una transferencia intrabancaria
    transferenciaIntrabancaria(monto, cuentadestino, cuentaorigen){
        //se modifican las dos cuentas al las dos pertenecer al mismo banco
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
    ////realiza los cambios en la bd luego de una transferencia interbancaria
    transferenciaInterbancaria(monto, cuentaorigen, tipocambio){
        let suma = 2 * tipocambio;//se le aplica la comision
        monto = parseInt(monto) + suma;
        //se modifica solo el balance de la cuenta perteneciente al banco
        db.query('UPDATE account SET balance = balance - ? WHERE iban = ?;', [monto, cuentaorigen], function(err, res){
            if(err){
                console.log(err);
            }
        });
    }
    //retorna el balance de una cuenta con dicho iban
    async getMonto(iban){
        return new Promise((resolve, reject) => {
            db.query('SELECT balance FROM account WHERE iban = ?', [iban], function (err, result) {
                if(err) reject(err);
                resolve(result);
            });
        }).then((result) => {
            return result;
        });
    }
}

module.exports = Account;