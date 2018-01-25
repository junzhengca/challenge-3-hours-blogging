var app = new Vue({
    el: '#app',
    data: {
        posts: []
    },
    mounted: function(){
        this.loadAllPosts()
    },
    methods: {
        loadAllPosts: function(){
            var self = this
            axios.get("/api/v1/posts").then(function(data) {
              self.posts = data.data  
            })
        }
    }
})