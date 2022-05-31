const db = require('../database/db');

class Cita{
    agendar(idUser, fecha, motivo){
        db.query("INSERT INTO cita (idUser, date, motivo) VALUES (?);", 
                [[idUser, fecha, motivo]]
        );
    }
    cancelar(id){
        db.query("DELETE FROM cita WHERE id = ?" , [id]);
    }
    reagendar(id, fecha){
        db.query("UPDATE cita SET date = ? WHERE id = ?", [fecha, id]);
    }
}

module.exports = Cita;