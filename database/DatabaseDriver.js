class DatabaseDriver {
    construct(){}
    
    /**
     * Create a new table
     * @param {string} tableName 
     * @param {list of Field} fields 
     * @param {function(err)} callback
     */
    createTable(tableName, fields, callback){
        throw "createTable method not implemented"
    }

    /**
     * Insert into table
     * @param {string} tableName 
     * @param {*} data 
     * @param {function(err)} callback
     */
    insert(tableName, data, callback){
        throw "insert method not implemented"
    }

    /**
     * Get one record based on conditions
     * @param {string} tableName 
     * @param {*} conditions
     * @param {*} binding
     * @param {*} callback
     */
    get(tableName, conditions, binding, callback){
        throw "get method not implemented"
    }

    /**
     * Select multiple records based on conditions
     * @param {string} tableName 
     * @param {*} conditions 
     * @param {*} binding
     * @param {*} callback
     */
    select(tableName, conditions, binding, callback){
        throw "select method not implemented"
    }

    /**
     * Update rows by search
     * @param {*} tableName 
     * @param {*} search 
     * @param {*} set 
     * @param {*} data 
     * @param {*} callback 
     */
    update(tableName, set, search, data, callback){
        throw "update method not implemented"
    }

    /**
     * Delete a record from database
     * @param {*} tableName 
     * @param {*} conditions 
     * @param {*} data 
     * @param {*} callback 
     */
    delete(tableName, conditions, data, callback){
        throw "delete method not implemented"
    }
}

/**
 * Field
 *  - name string
 *  - type (TEXT, INTEGER, DATETIME)
 *  - primaryKey boolean
 *  - autoIncrement boolean
 */

module.exports = DatabaseDriver