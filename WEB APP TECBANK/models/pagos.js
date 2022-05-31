const db = require('../database/db');

class Pago{
    pago(cuentadebitar){
        let monto = 20000;
        db.query('UPDATE account SET balance = balance - ? WHERE iban = ?;', [monto, cuentadebitar], function(err, res){
            console.log(cuentadebitar);
            if(err){
                console.log(err);
            }
        });
    }
}

module.exports = Pago;