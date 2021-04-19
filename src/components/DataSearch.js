import React from "react";

const SearchGroup = props => (
  <form>
    <label>
      {props.title}
      {props.checkedVal
        ? <input onKeyDown={(e) => { if (e.keyCode === 13) e.preventDefault() }} type="text" name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
        : <></>
      }
    </label>
    <label className="switch">
      <input type="checkbox" checked={props.checkedVal} name={props.checkedName} onChange={props.checkboxClick} />
      <span className="slider round"></span>
    </label>

  </form>
);

export default SearchGroup;