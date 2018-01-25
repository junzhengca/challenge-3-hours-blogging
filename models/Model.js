/**
 * Base class for models
 */
class Model {
    constructor(driver){
        this._driver = driver
    }

    /**
     * Make a new model and save to database
     * @param {*} driver 
     * @param {*} fields 
     * @param {*} callback 
     */
    static make(driver, fields, callback){
        driver.insert(this._getTableName(), fields, (result) => {
            callback(result)
        })
    }

    /**
     * Get one model
     * @param {*} driver 
     * @param {*} config 
     * @param {*} callback 
     */
    static get(driver, config, callback){
        throw "static get method not implemented"
    }

    /**
     * Get all models
     * @param {*} driver 
     * @param {*} config 
     * @param {*} callback 
     */
    static all(driver, config, callback){
        throw "static find all not implemented"
    }

    /**
     * Static method to get table name
     */
    static _getTableName(){
        throw "private static _getTableName method not implemented"
    }
}

module.exports = Model