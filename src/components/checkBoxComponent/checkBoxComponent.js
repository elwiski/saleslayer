import React from "react";
import "./checkBoxComponent.scss"

function CheckBoxComponent(props) {
  const { languagesObject, onHandleChange } = props;
  const keys = Object.keys(languagesObject);

  return (
    <div className="selectionLabel">
     {keys.map((item, i) => (
            <label className="inputCheckboxContainer" key={item}>
              {item}
                <input checked={languagesObject[item]} onChange={onHandleChange} type="checkbox" value={item} key={item}/>
              <span className="checkmark" />
            </label>
        ))}
    </div>
  );    
}
export default CheckBoxComponent;