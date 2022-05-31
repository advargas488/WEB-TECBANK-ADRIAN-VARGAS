const db = require('../database/db');

class Cita{
    //guarda una cita en la bd
    agendar(idUser, fecha, motivo){
        db.query("INSERT INTO cita (idUser, date, motivo) VALUES (?);", 
                [[idUser, fecha, motivo]]
        );
    }
    //cancela una cita, la elimina de la bd
    cancelar(id){
        db.query("DELETE FROM cita WHERE id = ?" , [id]);
    }
    //reagenda la cita, realiza los cambios en la bd
    reagendar(id, fecha){
        db.query("UPDATE cita SET date = ? WHERE id = ?", [fecha, id]);
    }
}

module.exports = Cita;