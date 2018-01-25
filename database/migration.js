const SQLite3Driver = require('./SQLite3Driver')

/**
 * Default createTable callback
 * @param {*} err 
 */
function defaultCreateTableCallback(result){
    if(!result){
        throw "Unable to create table"
    }
}

/**
 * We by default use SQLite3 migration
 * @param {*} db 
 */
module.exports = (db) => {
    const driver = new SQLite3Driver(db)
    driver.createTable('posts', [
        {
            name: 'id',
            type: 'INTEGER',
            primaryKey: true,
            autoIncrement: true
        },
        {
            name: 'title',
            type: 'TEXT'
        },
        {
            name: 'content',
            type: 'TEXT'
        },
        {
            name: 'createTime',
            type: 'TEXT'
        }
    ], defaultCreateTableCallback)
    driver.createTable('users', [
        {
            name: 'id',
            type: 'INTEGER',
            primaryKey: true,
            autoIncrement: true
        },
        {
            name: 'username',
            type: 'TEXT'
        },
        {
            name: 'password',
            type: 'TEXT'
        },
        {
            name: 'userGroup',
            type: 'TEXT'
        }
    ], defaultCreateTableCallback)
    driver.createTable('tokens', [
        {
            name: 'id',
            type: 'INTEGER',
            primaryKey: true,
            autoIncrement: true
        },
        {
            name: 'username',
            type: 'TEXT'
        },
        {
            name: 'tokenBody',
            type: 'TEXT'
        }
    ], defaultCreateTableCallback)
}