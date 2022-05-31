const Account = require('../models/accounts');

class AccountController{
    //controlador de las cuentas
    constructor(){
        this.account = new Account();
    }
    //realiza una transferencia intrabancaria
    async transIntra(monto, cuentadestino, cuentaorigen){
        await this.account.transferenciaIntrabancaria(monto, cuentadestino, cuentaorigen);
    }
    //realiza una transferencia interbancaria
    async transInter(monto, cuentaorigen, compra){
        await this.account.transferenciaInterbancaria(monto, cuentaorigen, compra);
    }
    //accede al monto de una cuenta y lo retorna
    async getAccMonto(iban){
        return await this.account.getMonto(iban);
    }
}

module.exports = AccountController;