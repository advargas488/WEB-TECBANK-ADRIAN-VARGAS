const Account = require('../models/accounts');

class AccountController{

    constructor(){
        this.account = new Account();
    }

    async transIntra(monto, cuentadestino, cuentaorigen){
        await this.account.transferenciaIntrabancaria(monto, cuentadestino, cuentaorigen);
    }

    async transInter(monto, cuentaorigen, compra){
        await this.account.transferenciaInterbancaria(monto, cuentaorigen, compra);
    }

    async getAccMonto(iban){
        return await this.account.getMonto(iban);
    }
}

module.exports = AccountController;