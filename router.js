module.exports = {
    auto: {
        exclude: '_src'
    },
    custom: (data) => {
        const result = {};

        result['index.xml'] = { target: '_src/rss.ejs' }
        
        Object.keys(data.posts).forEach((postKey) => {
            result['posts/' + postKey + '.html'] = { target: '_src/views/post.ejs', params: { post: data.posts[postKey] } }
        });

        return result;
    }
}
