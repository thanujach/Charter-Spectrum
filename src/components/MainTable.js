import React, {
  Component
} from 'react';
import DataTable from './DataTable';

class MainTable extends Component {
  render() {
    return (
      <>
        <table id="filterTable">
          <tbody>
            <tr>
              <th></th>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Phone Number</th>
              <th>Genres</th>
            </tr>
            {this.renderRows()}
          </tbody>
        </table>
      </>
    );
  }

  renderRows = () => {
    const items = this.props.data.map((item, index) => {
      return <DataTable key={item.id} responseData={item} index={index} />
    })
    return (items.length === 0) ? <tr><td colSpan='6' className="noResults">No Results were found</td></tr> : items
  }
}

export default MainTable;