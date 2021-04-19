import axios from "axios";
const base_url = 'https://code-challenge.spectrumtoolbox.com/api/restaurants';
const key = 'Api-Key q3MNxtfep8Gt'

export default {
  search: function () {
    return (
      axios.get(base_url, {
        headers: {
          Authorization: key
        }
      })
    )
  }
};