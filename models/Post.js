const Model = require('./Model')

class Post extends Model {

    /**
     * Construct post model
     * @param {*} driver 
     * @param {*} id 
     * @param {*} title 
     * @param {*} content 
     * @param {*} createTime 
     */
    constructor(driver, id=null, title=null, content=null, createTime=null){
        super(driver)
        this.id = id
        this.title = title
        this.content = content
        this.createTime = createTime
    }

    /**
     * Get one post by id
     * @param {*} driver 
     * @param {*} id 
     * @param {*} callback 
     */
    static get(driver, id, callback){
        driver.get(this._getTableName(), "id=?", [id], (result) => {
            if(result){
                callback(new Post(driver, result.id, result.title, result.content, result.createTime))
            } else {
                callback(false)
            }
        })
    }

    /**
     * Delete a post
     * @param {*} callback
     */
    delete(callback){
        this._driver.delete(Post._getTableName(), "id=?", [this.id], (result) => {
            if(result){
                callback(true)
            } else {
                callback(false)
            }
        })
    }

    /**
     * Update a blog post
     * @param {*} title 
     * @param {*} content 
     * @param {*} callback 
     */
    update(title, content, callback){
        this._driver.update(Post._getTableName(), "title=?, content=?", "id=?", [title, content, this.id], (result) => {
            if(result){
                callback(true)
                this.title = title
                this.content = content
            } else {
                callback(false)
            }
        })
    }

    /**
     * Get all posts
     * @param {*} driver 
     * @param {*} callback 
     */
    static all(driver, callback){
        driver.select(this._getTableName(), "1=?", [1], (result) => {
            if(result){
                let objectArr = []
                for(let i in result){
                    let post = result[i]
                    let currObj = new Post(driver, post.id, post.title, post.content, post.createTime)
                    objectArr.push(currObj)
                }
                callback(objectArr)
            } else {
                callback([])
            }
        })
    }

    /**
     * Static method to get table name
     */
    static _getTableName(){
        return "posts"
    }
}

module.exports = Post