let User = require('../models/user');

class UserController{

    constructor(){
        this.user_ = new User(null,null,null,null,null,null,null);
    }

    login(user, pass){
        return this.user_.login(user,pass);
    }

    register(name, surname, email, ced, user, pass){
        this.user_.register(name, surname, email, ced, user, pass);
    }

    async getAccounts(){
        return await this.user_.getAccounts();
    }

    getEmail(){
        return this.user_.getEmail();
    }

    async getDates(){
        return await this.user_.getDates();
    }

    getId(){
        return this.user_.getId();
    }
}

module.exports = UserController;