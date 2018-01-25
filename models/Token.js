const Model = require('./Model')

class Token extends Model {

    /**
     * Construct Token model
     * @param {*} driver 
     * @param {*} id 
     * @param {*} username 
     * @param {*} tokenBody 
     */
    constructor(driver, id=null, username=null, tokenBody=null){
        super(driver)
        this.id = id
        this.username = username
        this.tokenBody = tokenBody
    }

    /**
     * Get one token by token body
     * @param {*} driver 
     * @param {*} tokenBody 
     * @param {*} callback 
     */
    static get(driver, tokenBody, callback){
        driver.get(this._getTableName(), "tokenBody=?", [tokenBody], (result) => {
            if(result){
                callback(new Token(driver, result.id, result.username, result.tokenBody))
            } else {
                callback(false)
            }
        })
    }

    /**
     * Static method to get table name
     */
    static _getTableName(){
        return "tokens"
    }
}

module.exports = Token