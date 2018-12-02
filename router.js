const fs = require('fs');
const path = require('path');

function getFaviconsFiles() {
    const faviconsFolderPath = path.join(__dirname, '/src/_src/favicons');
    return fs.readdirSync(faviconsFolderPath);
}

module.exports = {
    auto: {
        exclude: '_src'
    },
    custom: (data) => {
        const result = {};

        getFaviconsFiles().forEach((file) => {
            result[file] = { target: `_src/favicons/${file}` };
        });

        result['index.xml'] = { target: '_src/rss.ejs' }
        
        Object.keys(data.posts).forEach((postKey) => {
            result['posts/' + postKey + '.html'] = { target: '_src/views/post.ejs', params: { post: data.posts[postKey] } }
        });

        return result;
    }
}
