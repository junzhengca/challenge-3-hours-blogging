const DatabaseDriver = require('./DatabaseDriver')

class SQLite3Driver extends DatabaseDriver {
    constructor(db){
        super()
        this._db = db
    }

    /**
     * Create a new table
     * @param {string} tableName 
     * @param {list of Field} fields 
     * @param {function(err)} callback 
     */
    createTable(tableName, fields, callback){
        let query = "CREATE TABLE " + tableName + " ("
        for(let i in fields){
            let field = fields[i]
            query += field.name + " " + field.type
            if(field.primaryKey){
                query += " PRIMARY KEY"
            }
            if(field.autoIncrement){
                query += " AUTOINCREMENT"
            }
            query += ","
        }
        query = query.substring(0, query.length - 1)
        query += ")"
        this._db.serialize(() => {
            this._db.run(query, (err) => {
                if(err){
                    callback(false)
                } else {
                    callback(true)
                }
            })
        })
    }

    /**
     * Insert data into database
     * @param {string} tableName 
     * @param {*} data 
     * @param {function(err)} callback 
     */
    insert(tableName, data, callback){
        let query = "INSERT INTO " + tableName
        let dataArr = []
        let postQuery = ""
        for(let i in data){
            postQuery += "?,"
            dataArr.push(data[i])
        }
        // Trim last comma
        postQuery = postQuery.substring(0, postQuery.length - 1)
        query += " VALUES ("
        query += postQuery += ")"
        this._db.run(query, dataArr, (err) => {
            if(err){
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    /**
     * Get one row from database
     * @param {*} tableName 
     * @param {*} condition 
     * @param {*} data 
     * @param {*} callback 
     */
    get(tableName, condition, data, callback){
        let query = "SELECT * FROM " + tableName + " WHERE " + condition
        this._db.get(query, data, (err, row) => {
            if(err){
                callback(false)
            } else {
                callback(row)
            }
        })
    }

    /**
     * Select multiple records based on conditions
     * @param {string} tableName 
     * @param {*} conditions 
     * @param {*} binding
     * @param {*} callback
     */
    select(tableName, conditions, data, callback){
        let query = "SELECT * FROM " + tableName + " WHERE " + conditions
        this._db.all(query, data, (err, row) => {
            if(err){
                callback(false)
            } else {
                callback(row)
            }
        })
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
        let query = "UPDATE " + tableName + " SET " + set + " WHERE " + search
        this._db.run(query, data, (err) => {
            if(err){
                callback(false)
            } else {
                callback(true)
            }
        })
    }

    /**
     * Delete a record from database
     * @param {*} tableName 
     * @param {*} conditions 
     * @param {*} data 
     * @param {*} callback 
     */
    delete(tableName, conditions, data, callback){
        let query = "DELETE FROM " + tableName + " WHERE " + conditions
        this._db.run(query, data, (err) => {
            if(err){
                callback(false)
            } else {
                callback(true)
            }
        })
    }
}

module.exports = SQLite3Driver