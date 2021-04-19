export default {
    states: function (state, data) {
        const filteredByState = [];
        data.forEach(function (item) {
            if (item.state === state) {
                filteredByState.push(item)
            }
        })
        return filteredByState
    },
    genres: function (genre, data) {
        const filteredByGenres = [];
        data.forEach(function (item) {
            if (item.genre.includes(genre)) {
                filteredByGenres.push(item)
            }
        })
        return filteredByGenres
    },
    typeText: function (input, data) {
        const filteredByGenres = [];
        data.forEach(function (item) {
            if (item.genre.toLowerCase().includes(input) || item.name.toLowerCase().includes(input) || item.city.toLowerCase().includes(input)) {
                filteredByGenres.push(item)
            }
        })
        return filteredByGenres
    }
};