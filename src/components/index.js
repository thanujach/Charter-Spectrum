import React, {
  Component
} from 'react';
import GetResponse from '../filters/GetResponse';
import PageData from '../filters/PageData';
import DataSearchFilter from '../filters/DataSearch';
import MainTable from './MainTable';
import DataSearch from './DataSearch';
import OptionFilter from './DataOption';

class Filterestaurant extends Component {
  state = {
    data: [],
    filteredData: [],
    pages: 0,
    pageIndex: 0,
    states: ['All States', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
    genres: [],
    findData: true,
    typeSearch: "",
    stateActive: true,
    stateName: "All States",
    genreActive: true,
    genreName: "All Genres",
  }

  dataChange = event => {
    event.preventDefault()
    const {
      name,
      value
    } = event.target;
    this.setState({
      [name]: value,
      pageIndex: 0
    }, function () {
      this.dataFilter();
    });
  };


  datacheckChange = event => {
    const {
      name,
      checked
    } = event.target;
    this.setState({
      [name]: checked,
      pageIndex: 0
    }, function () {
      this.dataFilter();
    });
  };


  reset = event => {
    this.setState({
      pageIndex: 0,
      findData: true,
      typeSearch: "",
      stateActive: true,
      stateName: "All States",
      genreActive: true,
      genreName: "All Genres",
    }, function () {
      this.dataFilter();
    });
  };


  dataFilter() {
    let data = this.state.data
    if (this.state.stateActive && this.state.stateName !== "All States") {
      const filteredData = DataSearchFilter.states(this.state.stateName, data)
      data = filteredData
    }
    if (this.state.genreActive && this.state.genreName !== "All Genres") {
      const filteredData = DataSearchFilter.genres(this.state.genreName, data)
      data = filteredData
    }
    if (this.state.findData && this.state.typeSearch !== "") {
      const filteredData = DataSearchFilter.typeText(this.state.typeSearch.toLowerCase(), data)
      data = filteredData
    }
    this.paginateData(data)
  }

  next = event => {
    var slideCount = this.state.pageIndex + 1;
    if (slideCount >= this.state.filteredData.length) { this.setState({ pageIndex: 0 }) }
    else if (slideCount <= this.state.filteredData.length - 1) { this.setState({ pageIndex: slideCount }) };
  };

  previous = event => {
    var slideCount = this.state.pageIndex - 1;
    if (slideCount < 0) {
      this.setState({ pageIndex: this.state.filteredData.length - 1 })
    }
    else if (slideCount <= this.state.filteredData.length) {
      this.setState({ pageIndex: slideCount })
    };
  };

  paginateData(arr) {
    const splitData = PageData.paginateStruct(arr, 10);
    this.setState({
      filteredData: splitData
    })
  }

  componentDidMount() {
    GetResponse.search()
      .then(res => {
        const genres = PageData.genresData(res.data);
        const sortedData = res.data.sort(function (a, b) {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a < b ? -1 : a > b ? 1 : 0;
        });
        this.setState({
          data: sortedData,
          genres: genres
        }, this.paginateData(sortedData))
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Restaurants</h1>
        <div className='searchFil'>
          <DataSearch
            title={'Search: '}
            checkedName={'findData'}
            checkedVal={this.state.findData}
            name={'typeSearch'}
            value={this.state.typeSearch}
            placeholder={'Name, City, Genre)'}
            onChange={this.dataChange}
            checkboxClick={this.datacheckChange}
          />
          <OptionFilter
            title={'State: '}
            checkedName={'stateActive'}
            checkedVal={this.state.stateActive}
            name={'stateName'}
            value={this.state.stateName}
            onChange={this.dataChange}
            checkboxClick={this.datacheckChange}
            options={this.state.states}
          />
          <OptionFilter
            title={'Genre: '}
            checkedName={'genreActive'}
            checkedVal={this.state.genreActive}
            name={'genreName'}
            value={this.state.genreName}
            onChange={this.dataChange}
            checkboxClick={this.datacheckChange}
            options={this.state.genres}
          />
          <button onClick={this.reset}>Reset Search</button>
        </div>
        <MainTable data={this.state.filteredData[0] ? this.state.filteredData[this.state.pageIndex] : []} />
        {this.state.filteredData.length > 0 && <div className="paging">
          <a href="#0" className="previous" onClick={this.previous}>&#10094;</a>
          <p>{"Page: " + (parseInt(this.state.pageIndex) + 1) + " of " + this.state.filteredData.length}</p>
          <a href="#0" className="next" onClick={this.next}>&#10095;</a>
        </div>}
      </div>
    );
  }
}

export default Filterestaurant;