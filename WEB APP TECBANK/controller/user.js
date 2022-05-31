let User = require('../models/user');

class UserController{
    //controlador para los usuarios
    constructor(){
        this.user_ = new User(null,null,null,null,null,null,null);
    }
    //loggea al usuario
    login(user, pass){
        return this.user_.login(user,pass);
    }
    //registra un usuario
    register(name, surname, email, ced, user, pass){
        this.user_.register(name, surname, email, ced, user, pass);
    }
    //retorna las cuentas del usuario
    async getAccounts(){
        return await this.user_.getAccounts();
    }
    //retorna el email del usuario
    getEmail(){
        return this.user_.getEmail();
    }
    //retorna las citas del usuario
    async getDates(){
        return await this.user_.getDates();
    }
    //retorna el id del usuario
    getId(){
        return this.user_.getId();
    }
}

module.exports = UserController;