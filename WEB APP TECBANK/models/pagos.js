const db = require('../database/db');

class Pago{
    //realiza un pago de internet/servicio educativo
    pago(cuentadebitar){
        let monto = 20000;//monto predeterminado
        db.query('UPDATE account SET balance = balance - ? WHERE iban = ?;', [monto, cuentadebitar], function(err, res){
            console.log(cuentadebitar);
            if(err){
                console.log(err);
            }
        });
    }
}

module.exports = Pago;