import React from "react";

function InputForm(props) {
  return (
    <>
      <label style={{ width: "200px", marginLeft: 0 }}>{props.title}</label>
      <input
        style={{ width: "200px", marginLeft: 2 }}
        required={true}
        value={props.value}
        name={props.name}
        type="text"
        onChange={props.onInputChange}
      />
    </>
  );
}

export default InputForm;