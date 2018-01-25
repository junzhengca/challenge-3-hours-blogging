/**
 * Set a new cookie, update existing
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get a cookie, return "" if none found
 * @param {*} cname 
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Initialize Vue.js
 */
var app = new Vue({
    el: '#app',
    data: {
        username: "",
        password: "",
        authToken: "",
        newPostTitle: "",
        newPostContent: "",
        posts: [],
        editingPost: null
    },
    mounted: function(){
        var self = this
        // Check login status once
        axios.get('/api/v1/checkLoginStatus',{
            headers: {'token': getCookie('auth-token')}
        }).then(function(data) {
            self.authToken = getCookie('auth-token')
        })
        this.loadAllPosts()
    },
    methods: {
        /**
         * Attempt a login
         */
        login: function(){
            var self = this
            axios.post("/api/v1/login", {
                username: this.username,
                password: this.password
            }).then(function(data){
                console.log(self)
                self.authToken = data.data.token
                setCookie('auth-token', data.data.token, 7)
            }).catch(function(e){
                alert("用户名或密码不正确")
            })
        },
        /**
         * Create a new blog post
         */
        newPost: function(){
            var self = this
            axios.post("/api/v1/createNewPost", {
                title: this.newPostTitle,
                content: this.newPostContent
            }, {
                headers: {'token': this.authToken}
            }).then(function(data){
                alert("成功创建文章")
                self.newPostTitle = ""
                self.newPostContent = ""
                self.loadAllPosts()
            }).catch(function(e){
                alert("创建文章失败")
            })
        },
        /**
         * Reload all blog posts
         */
        loadAllPosts: function(){
            var self = this
            axios.get("/api/v1/posts").then(function(data) {
              self.posts = data.data  
            })
        },
        /**
         * Save/upate a blog post
         */
        savePost: function(){
            var self = this
            axios.post("/api/v1/updatePost", {
                title: this.editingPost.title,
                content: this.editingPost.content,
                id: this.editingPost.id
            }, {
                headers: {'token': this.authToken}
            }).then(function(data){
                alert("成功保存文章")
                self.editingPost = null
                self.loadAllPosts()
            }).catch(function(e){
                alert("保存文章失败")
            })
        },
        /**
         * Delete a blog post
         */
        deletePost: function(id){
            var self = this
            if(confirm("你确定要删除这个博文？")){
                axios.post("/api/v1/deletePost", {
                    id: id
                }, {
                    headers: {'token': this.authToken}
                }).then(function(data){
                    alert("成功删除文章")
                    self.loadAllPosts()
                }).catch(function(e){
                    alert("删除文章失败")
                })
            }
        }
    }
})