const Cita = require('../models/citas');

class CitaController{
    //controlador de las citas
    constructor(){
        this.cita = new Cita();
    }
    //cancela una cita
    async cancelarCita(id){
        await this.cita.cancelar(id);
    }
    //agenda una cita
    async agendarCita(idUser, fecha, motivo){
        await this.cita.agendar(idUser, fecha, motivo);
    }
    //reagenda una cita
    async reagendarCita(id, fecha){
        await this.cita.reagendar(id, fecha);
    }
}

module.exports = CitaController;