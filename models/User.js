const Model = require('./Model')

class User extends Model {

    /**
     * Construct User model
     * @param {*} driver 
     * @param {*} id 
     * @param {*} username 
     * @param {*} password 
     * @param {*} group 
     */
    constructor(driver, id=null, username=null, password=null, group=null){
        super(driver)
        this.id = id
        this.username = username
        this.password = password
        this.group = group
    }

    /**
     * Get one user by username
     * @param {*} driver 
     * @param {*} username 
     * @param {*} callback 
     */
    static get(driver, username, callback){
        driver.get(this._getTableName(), "username=?", [username], (result) => {
            if(result){
                callback(new User(driver, result.id, result.username, result.password, result.group))
            } else {
                callback(false)
            }
        })
    }

    /**
     * Static method to get table name
     */
    static _getTableName(){
        return "users"
    }
}

module.exports = User