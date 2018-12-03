const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(rawDate) {
    const parts = rawDate.split(' ');
    const date = parts[0];
    const time = parts[1];

    const dateParts = date.split('-');
    const timeParts = time.split(':');

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);

    const d = new Date(Date.UTC(year, month, day, hour, minute));

    return {
        d,
        display: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1, '00')}-${pad(d.getUTCDate(), '00')} ${pad(d.getUTCHours(), '00')}:${pad(d.getUTCMinutes(), '00')}`,
        rss: `${weekDays[d.getUTCDay()]}, ${pad(d.getUTCDate(), '00')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} ${pad(d.getUTCHours(), '00')}:${pad(d.getUTCMinutes(), '00')}:00 GMT`
    }
}

function pad(value, pad) {
    return (pad + value).substr(-pad.length);
}

module.exports = {
    data(parentData) {
        return Object.keys(parentData.posts)
            .map((postKey) => {
                const post = parentData.posts[postKey];
                return {
                    slug: post.meta.slug,
                    title: post.meta.title,
                    date: parseDate(post.meta.date),
                    html: post.html
                }
            })
            .sort((a, b) => {
                return a.date.d < b.date.d;
            });
    }
}
