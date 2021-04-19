import React from 'react';

class DataOption extends React.Component {
  renderOptions() {
    const items = this.props.options.map(item => <option key={item} value={item}>{item}</option>)
    return items;
  }

  render() {
    return (
      <form>
        <label>
          {this.props.title}
          {this.props.checkedVal
            ? <select name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
              {this.renderOptions()}
            </select>
            : <></>
          }
        </label>

        <label className="switch">
          <input type="checkbox" checked={this.props.checkedVal} name={this.props.checkedName} onChange={this.props.checkboxClick} />
          <span className="slider round"></span>
        </label>
      </form>
    );
  }
}

export default DataOption;