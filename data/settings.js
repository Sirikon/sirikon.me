const me = {
    name: 'Carlos',
    surname: ['Fernández', 'Llamas'],
    get fullName() { return `${me.name} ${me.surname.join(' ')}` },
    alias: 'Sirikon'
};

module.exports = {
    data() {
        return {
            title: 'Sirikon.me',
            description: `${me.fullName} personal website.`,
            url: process.env.SIRIKONME_URL || 'http://localhost:3000',
            footer: `${me.alias} - 2018`,

            me,

            about: {
                facts: [
                    ["Born in", "Málaga, Andalusia", "https://www.openstreetmap.org/relation/340746"],
                    ["Living in", "Bilbao, Basque Country", "https://www.openstreetmap.org/relation/339549"],
                    ["Working on", "Plain Concepts", "https://www.plainconcepts.com/"],
                    ["Mostly", "programming", "https://github.com/sirikon/"],
                    ["Even some", "games", "https://sirikon.itch.io/"],
                    ["Doing some", "photography", "https://500px.com/sirikon"],
                    ["Talking on", "the fediverse", "https://plaza.remolino.town/users/402"],
                ],
                contact: [
                    ["Email", "hello@sirikon.me", "mailto:hello@sirikon.me"],
                    ["ActivityPub", "@sirikon@plaza.remolino.town", "https://plaza.remolino.town/sirikon"],
                ]
            }
        }
    }
}
