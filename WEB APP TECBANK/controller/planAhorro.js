const PlanAhorro = require('../models/planAhorro');

class PlanAhorroController{
    //controlador para los planes de ahorro
    constructor(){
        this.planAhorro = new PlanAhorro();
    }
    //guarda el plan de ahorro y despliega el monto final estimado
    async iniciarPlanAhorro(tipoinversion, cuentaorigen, nombre, montoinicial){
        await this.planAhorro.iniciarPlanAhorro(tipoinversion, cuentaorigen, nombre, montoinicial);
        return this.planAhorro.calcularEstimado(montoinicial, tipoinversion);
    }
}

module.exports = PlanAhorroController;