const db = require('../database/db');

class PlanAhorro{
    //inicia el plan de ahorro y lo guarda en la bd
    iniciarPlanAhorro(tipoinversion, cuentadebitar, nombre, montoinicial){
        db.query("INSERT INTO planahorro (plazo,nombre,montoinicial) VALUES (?);", [[tipoinversion, nombre, montoinicial]], 
        function(err, result){
            if(err){
                console.log(err);
            }
        });

        db.query('UPDATE account SET balance = balance - ? WHERE iban = ?;', [montoinicial, cuentadebitar], function(err, res){
            if(err){
                console.log(err);
            }
        });
    }
    //calcula el estimado de monto final dependiendo del tipo de inversion y el monto inicial
    calcularEstimado(montoinicial, tipoinversion){
        if(tipoinversion <= 1){
            if(montoinicial >= 500000 && montoinicial <= 2500000){
                return montoinicial * (montoinicial*(1.5/100)) * tipoinversion;
            }
            else if(montoinicial > 2500000 && montoinicial <= 6000000){
                return montoinicial * (montoinicial*(2.5/100)) * tipoinversion;
            }
            else{
                return montoinicial * (montoinicial*(2/100)) * tipoinversion;
            }
        }
        else if(tipoinversion == 3){
            if(montoinicial >= 500000 && montoinicial <= 2500000){
                return montoinicial * (montoinicial*(2.5/100)) * tipoinversion;
            }
            else if(montoinicial > 2500000 && montoinicial <= 6000000){
                return montoinicial * (montoinicial*(5/100)) * tipoinversion;
            }
            else{
                return montoinicial * (montoinicial*(12.5/100)) * tipoinversion;
            }
        }
        else if(tipoinversion == 5){
            if(montoinicial >= 500000 && montoinicial <= 2500000){
                return montoinicial * (montoinicial*(5/100)) * tipoinversion;
            }
            else if(montoinicial > 2500000 && montoinicial <= 6000000){
                return montoinicial * (montoinicial*(8/100)) * tipoinversion;
            }
            else{
                return montoinicial * (montoinicial*(10/100)) * tipoinversion;
            }
        }
        else{
            if(montoinicial >= 500000 && montoinicial <= 2500000){
                return montoinicial * (montoinicial*(12.5/100)) * tipoinversion;
            }
            else if(montoinicial > 2500000 && montoinicial <= 6000000){
                return montoinicial * (montoinicial*(15/100)) * tipoinversion;
            }
            else{
                return montoinicial * (montoinicial*(20/100)) * tipoinversion;
            }
        }
    }

}

module.exports = PlanAhorro;