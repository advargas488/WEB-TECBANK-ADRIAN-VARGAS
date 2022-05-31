const PlanAhorro = require('../models/planAhorro');

class PlanAhorroController{
    constructor(){
        this.planAhorro = new PlanAhorro();
    }

    async iniciarPlanAhorro(tipoinversion, cuentaorigen, nombre, montoinicial){
        await this.planAhorro.iniciarPlanAhorro(tipoinversion, cuentaorigen, nombre, montoinicial);
        return this.planAhorro.calcularEstimado(montoinicial, tipoinversion);
    }
}

module.exports = PlanAhorroController;