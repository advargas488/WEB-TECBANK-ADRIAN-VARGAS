const Cita = require('../models/citas');

class CitaController{
    constructor(){
        this.cita = new Cita();
    }

    async cancelarCita(id){
        await this.cita.cancelar(id);
    }
    async agendarCita(idUser, fecha, motivo){
        await this.cita.agendar(idUser, fecha, motivo);
    }
    async reagendarCita(id, fecha){
        await this.cita.reagendar(id, fecha);
    }
}

module.exports = CitaController;