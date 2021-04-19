export default {
  paginateStruct: function (arr, len) {
    var chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  },
  genresData: function (data) {
    let newArr = ['All Genres']
    data.forEach(function (item) {
      const items = item.genre.split(',')
      newArr = newArr.concat(items)
    })
    const newGenres = [...new Set(newArr)]
    return newGenres;
  }
};