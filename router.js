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

        result['about/index.html'] = { target: '_src/pages/about.ejs' }
        result['projects/index.html'] = { target: '_src/pages/projects.ejs' }
        result['index.xml'] = { target: '_src/rss.ejs' }

        data.postsIndex.forEach((post) => {
            result['post/' + post.slug + '/index.html'] = { target: '_src/views/post.ejs', params: { post } }
        });

        return result;
    }
}
