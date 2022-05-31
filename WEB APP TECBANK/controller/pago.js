const Pago = require('../models/pagos');

class PagoController{
    constructor(){
        this.pago = new Pago();
    }

    async realizarPago(cuentadebitar){
        await this.pago.pago(cuentadebitar);
    }
}

module.exports = PagoController;