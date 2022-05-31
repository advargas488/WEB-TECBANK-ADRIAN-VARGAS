const Pago = require('../models/pagos');

class PagoController{
    //controlador para los pagos de internet y servicios institucionales
    constructor(){
        this.pago = new Pago();
    }
    //realiza un pago
    async realizarPago(cuentadebitar){
        await this.pago.pago(cuentadebitar);
    }
}

module.exports = PagoController;