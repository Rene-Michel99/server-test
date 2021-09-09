const {Sequelize, DataTypes, Model} = require("sequelize");
const user_create = require("../models/user");
const message_create = require("../models/message");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.db'
});

class Database {
    constructor(sequelize){
        const model = {};
        model.Sequelize = Sequelize;
        this.Sequelize = Sequelize;

        this.model = model;
        this.model.user = user_create(sequelize,DataTypes);
        this.model.message = message_create(sequelize,DataTypes);
        
        //this.model.user.hasMany(this.model.message);
        //this.model.message.belongsTo(this.model.user);
    }
    async find_user(nome){
        var response = await this.model.user.findOne({where: {nome: nome}});

        return response;
    }
    async create_user(data){
        var response = await this.model.user.create(data);

        return response;
    }
    async get_msgs(nome){
        var id = await this.find_user(nome);
        id = id.id;
        
        var response = await this.model.message.findAll({where:{to:id}});
        if(response.length == 0){
            var all = await this.model.message.findAll({});
            
            if(all.length == 0){
                return "empty";
            }else{
                for(var i = 0; i < all.length; i++){
                    await this.model.message.destroy({where:{id:all[i].id}});
                }
                return all;
            }
        }else{
            for(var i = 0; i < response.length; i++){
                await this.model.message.destroy({where:{id:response[i].id}});
            }
            return response;
        }
    }
    async create_message(nome){
        var user_id = -1;
        var destiny_id = -1;
        var users = await this.model.user.findAll({});
        for(var i=0; i<users.length; i++){
            if(users[i].nome == nome)
                user_id = users[i].id;
            else
                destiny_id = users[i].id;
        }
        if(user_id != -1){
            var response = await this.model.message.create({from:user_id, to:destiny_id});

            return "sucess";
        }else{
            return "error";
        }
    }
    async syncronize(){
        await this.model.user.sync();
        await this.model.message.sync();
    }
}
var DB = new Database(sequelize); 
DB.syncronize();

module.exports = DB;