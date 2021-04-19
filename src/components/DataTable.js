import React, {
  Component
} from 'react';

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      responseData: props.responseData,
    };
  }

  toggleMoreInfo = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  };
  collapsible = () => {
    const {
      responseData: {
        address1,
        attire,
        hours,
        website,
        zip,
      },
    } = this.props;
    return (
      <>
        <tr>
          <td colSpan='6'>
            <table>
              <tbody>
                <tr>
                  <td>Hours:</td>
                  <td>{hours}</td>
                  <td>Address:</td>
                  <td>{address1}</td>
                  <td>Zip:</td>
                  <td>{zip}</td>
                  <td>Attire:</td>
                  <td>{attire}</td>
                  <td>Website:</td>
                  <td><a href={website}>{website}</a></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </>
    );
  };
  render() {
    const {
      responseData: {
        city,
        genre,
        name,
        state,
        telephone,
      },
    } = this.props;
    return (
      <>
        <tr>
          <td className="pointer" onClick={this.toggleMoreInfo}>{this.state.isCollapsed ? '-' : '+'}</td>
          <td>{name}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{telephone}</td>
          <td>{genre}</td>
        </tr>
        {this.state.isCollapsed ? this.collapsible() : <></>}
      </>
    );
  }
}

export default MainTable;